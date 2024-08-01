import { createStore } from "jotai";
import { BackendClient } from "../api/client";
import { Jotai } from "./_types";
import { UpdatesModel } from "./UpdatesModel";
import { Update } from "../api/schema";
import { TokenExpireService } from "./TokenExpireService";
import PostHog from "posthog-react-native";
import { getPostHog } from "../track/track";
import { ProfileService } from "./ProfileService";
import { UserService } from "./UserService";
import { NotificationsService } from "./NotificationsService";
import { AppUpdateService } from "./AppUpdateService";
import { FeedService } from "./FeedService";

export class AppService {
    readonly client: BackendClient;
    readonly jotai: Jotai;
    readonly posthog: PostHog;
    readonly updates: UpdatesModel;
    readonly tokenExpire: TokenExpireService;
    readonly profile: ProfileService;
    readonly users: UserService;
    readonly notifications: NotificationsService;
    readonly appUpdates: AppUpdateService;
    readonly feed: FeedService;

    constructor(client: BackendClient) {
        this.client = client;
        this.posthog = getPostHog();
        this.jotai = createStore();
        this.profile = new ProfileService(client, this.jotai);
        this.updates = new UpdatesModel(client);
        this.tokenExpire = new TokenExpireService(client);
        this.users = new UserService(client);
        this.notifications = new NotificationsService(client);
        this.appUpdates = new AppUpdateService();
        this.feed = new FeedService(client, this.jotai, this.users);
        this.updates.onUpdates = this.#handleUpdate;

        // Start
        this.updates.start();
    }

    #handleUpdate = async (update: Update) => {
        // TODO: Routing
    }
}