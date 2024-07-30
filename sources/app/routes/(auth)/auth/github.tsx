import { requestAuthVerify } from "@/modules/api/auth";
import { backoff } from "@/utils/time";
import { Redirect, Stack } from "expo-router";
import * as React from "react";
import { ActivityIndicator, View } from "react-native";
export default function GithubCallbackScreen() {
    const code = React.useMemo(() => {
        return new URL(window.location.href).searchParams.get('code');
    }, []);
    React.useEffect(() => {
        if (code) {
            backoff(async () => {
                const token = await requestAuthVerify(code);
                console.warn(token);
            });
        }
    }, []);
    if (!code) {
        return <Redirect href="/" />;
    }
    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={{ flexGrow: 1, flexBasis: 0, alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="white" />
            </View>
        </>
    );
}