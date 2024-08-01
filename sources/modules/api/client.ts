import { Axios } from "axios";
import { backoff } from "../../utils/time";
import { Schema, Update, Updates, sseUpdate } from "./schema";
import { sse } from "./sse";
import { SERVER_ENDPOINT } from "@/config";
import { log } from "@/utils/logs";

export class BackendClient {

    readonly client: Axios
    readonly token: string;

    constructor(client: Axios, token: string) {
        this.client = client;
        this.token = token;
    }

    async fetchPreState() {
        let res = await this.client.get('/pre/state');
        return Schema.preState.parse(res.data);
    }

    preComplete() {
        return backoff(async () => {
            await this.client.post('/pre/complete');
        })
    }

    registerPushToken(token: string) {
        return backoff(async () => {
            await this.client.post('/app/register_push_token', { token });
        })
    }

    //
    // Updates
    //

    async getUpdatesSeq() {
        let res = await this.client.post('/app/updates/seq', {});
        return Schema.getSeq.parse(res.data).seq;
    }

    async getUpdatesDiff(seq: number) {
        let res = await this.client.post('/app/updates/diff', { after: seq });
        return Schema.getDiff.parse(res.data);
    }

    updates(handler: (seq: number, update: Update | null) => void) {
        return sse(`https://${SERVER_ENDPOINT}/app/updates`, this.token, (update) => {
            let parsed = sseUpdate.safeParse(JSON.parse(update));
            if (!parsed.success) {
                return;
            }
            if (parsed.data.data) {
                let parsedUpdate = Updates.safeParse(parsed.data.data);
                if (parsedUpdate.success) {
                    handler(parsed.data.seq, parsedUpdate.data);
                } else {
                    console.error('Failed to parse update:', JSON.parse(update));
                    handler(parsed.data.seq, null);
                }
            } else {
                log('UPD', 'Received last known seq:' + parsed.data.seq);
                handler(parsed.data.seq, null);
            }

        });
    }

    //
    // Secure
    //

    async accountDelete() {
        await this.client.post('/secure/delete', {});
    }

    async tokenAndAccountStatus() {
        let res = await this.client.post('/secure/status', {});
        return Schema.accountStatus.parse(res.data).ok;
    }

    //
    // Profile
    //

    async me() {
        let res = await this.client.post('/app/me', {});
        return Schema.me.parse(res.data).profile;
    }

    async users(ids: string[]) {
        let res = await this.client.post('/app/users', { ids });
        return Schema.users.parse(res.data).users;
    }

    //
    // Developer
    //

    async updateDeveloperMode(enable: boolean) {
        let res = await this.client.post('/app/profile/edit/developer', { enable });
        Schema.ok.parse(res.data);
    }

    // async personalTokens() {
    //     let res = await this.client.post('/app/dev/tokens', {});
    //     return Schema.tokens.parse(res.data).tokens;
    // }

    // async createPersonalToken() {
    //     let res = await this.client.post('/app/dev/tokens/create', {});
    //     return Schema.tokenCreate.parse(res.data).token;
    // }

    // async deletePersonalToken(id: string) {
    //     let res = await this.client.post('/app/dev/tokens/delete', { id });
    //     Schema.ok.parse(res.data);
    // }

    //
    // Feed
    //

    async getFeedSeq(source: string) {
        let res = await this.client.post('/app/feed/state', { source });
        return Schema.feedState.parse(res.data).seqno;
    }

    async getFeedList(args: { source: string, before: number | null, after: number | null }) {
        let res = await this.client.post('/app/feed/list', args);
        let parsed = Schema.feedList.parse(res.data);
        let items: { seq: number, date: number, by: string, content: any }[] = [];
        for (let i of parsed.items) {
            items.push({ seq: i.seq, date: i.date, by: i.by, content: i.content });
        }
        return {
            items,
            next: parsed.next
        }
    }
}