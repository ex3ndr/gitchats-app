import { Theme } from '@/app/theme';
import * as React from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { _resolve } from '../_resolve';

export default React.memo(() => {
    const safeArea = useSafeAreaInsets();
    return (
        <View style={{ flexGrow: 1, backgroundColor: Theme.background, justifyContent: 'center', paddingHorizontal: 32, paddingTop: safeArea.top, paddingBottom: safeArea.bottom }}>
            <View style={{ flexGrow: 1 }} />
            <Text style={{ color: Theme.text, fontSize: 32, alignSelf: 'center', textAlign: 'center' }}>Unable to create profile</Text>
            <Text style={{ color: Theme.text, fontSize: 20, alignSelf: 'center', textAlign: 'center', marginTop: 32, marginBottom: 32 }}>Please, your app.</Text>
            <View style={{ flexGrow: 1 }} />
        </View>
    );
});