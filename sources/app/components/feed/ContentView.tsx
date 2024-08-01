import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Content } from '@/modules/api/content';
import { AppService } from '@/modules/services/AppService';
import { useAppModel } from '@/global';
import { Theme } from '@/app/theme';
import { RoundButton } from '@/app/components/RoundButton';
import Animated from 'react-native-reanimated';

export const ContentView = React.memo((props: { content: Content, app: AppService, display: 'normal' | 'large' }) => {
    if (Array.isArray(props.content)) {
        return (
            <View style={{ flexDirection: 'column' }}>
                {props.content.map((item, index) => (
                    <ContentView key={index} content={item} app={props.app} display={props.display} />
                ))}
            </View>
        )
    }
    if (props.content.kind === 'text') {
        return (
            <ContentText text={props.content.text} display={props.display} />
        )
    }
    return (
        <ContentText text={'Unknown content'} display={props.display} />
    );
});

const ContentText = React.memo((props: { text: string, display: 'normal' | 'large' }) => {
    return (
        <View style={{ marginHorizontal: props.display === 'large' ? 32 : 0, marginVertical: 4 }}>
            <Text style={{ color: Theme.text }}>{props.text}</Text>
        </View>
    )
});