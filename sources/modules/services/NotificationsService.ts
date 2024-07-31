import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { backoff } from "../../utils/time";
import { BackendClient } from "../api/client";
import { Platform } from 'react-native';

export class NotificationsService {
    readonly client: BackendClient;

    constructor(client: BackendClient) {
        this.client = client;

        if (!__DEV__ && Platform.OS !== 'web') {
            backoff(async () => {

                // Request permissions
                let permission = await Notifications.getPermissionsAsync();
                if (!permission.granted) {
                    return;
                }

                // Get token
                let token = await Notifications.getExpoPushTokenAsync({ projectId: Constants.expoConfig!.extra!.eas.projectId });

                // Register push token
                await this.client.registerPushToken(token.data);
            });
        }
    }
}