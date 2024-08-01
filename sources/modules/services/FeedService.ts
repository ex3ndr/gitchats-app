import { BackendClient } from "../api/client";
import { UserService } from "./UserService";
import { Jotai } from "./_types";
import { Content } from "../api/content";
import { FeedConnectionService } from "./FeedConnectionService";
import { UpdateFeedPosted } from "../api/schema";

export type FeedViewItem = {
    seq: number;
    date: number;
    content: Content;
    by: string;
};

export type FeedState = {
    items: FeedViewItem[];
    next: number | null;
} | null;

export type FeedID = 'home' | `u_${string}`;

export class FeedService {
    readonly client: BackendClient;
    readonly users: UserService;
    readonly jotai: Jotai;
    #feeds = new Map<string, FeedConnectionService>();

    constructor(client: BackendClient, jotai: Jotai, users: UserService) {
        this.client = client;
        this.jotai = jotai;
        this.users = users;
    }

    onUpdate = (update: UpdateFeedPosted) => {
        let svc = this.#feeds.get(update.source);
        if (svc) {
            svc.onUpdate(update);
        }
    };

    onReachedEnd = (feed: string, next: number | null) => {
        let svc = this.#feeds.get(feed);
        if (svc) {
            svc.onReachedEnd(next);
        }
    }

    use(feed: FeedID): FeedState {
        if (!this.#feeds.has(feed)) {
            this.#feeds.set(feed, new FeedConnectionService(feed, this.users, this.client, this.jotai));
        }
        return this.#feeds.get(feed)!.use();
    }
}