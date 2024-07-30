import * as React from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Theme } from '@/app/theme';
import { Feed } from '@/app/components/feed/Feed';
import { HomeHeader, HomeTopBar } from '../_navigation';
import { useLayout } from '@/utils/useLayout';
import LottieView from 'lottie-react-native';
import { useRouter } from 'expo-router';
import { useAppModel } from '@/global';
import { TimeView } from '@/app/components/TimeView';
import { Image } from 'expo-image';
import MapView from '@/app/components/MapView';

export default React.memo(() => {
    const app = useAppModel();
    const experimental = app.profile.useExperimentalMode();
    const layout = useLayout();
    const safeArea = useSafeAreaInsets();
    const router = useRouter();
    const openChat = () => {
        router.navigate('/chat/main');
    };

    // Views
    const header = (
        <View style={{ paddingHorizontal: 16, gap: 16, marginTop: (layout === 'large' ? (24 + safeArea.top) : 8) }}>
            <HomeTopBar />
            <Text style={{ fontSize: 18, color: Theme.text, paddingHorizontal: 16, fontWeight: '700' }}>Moments</Text>
        </View>
    );
    const footer = (loading: boolean) => {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'flex-start', paddingTop: 8, height: 64, marginBottom: safeArea.bottom, flexDirection: 'column' }}>
                {loading && (<ActivityIndicator />)}
                {!loading && <Text style={{ color: Theme.text, opacity: 0.7 }}>The end.</Text>}
            </View>
        )
    }
    const empty = (
        <ScrollView style={{ flex: 1 }} alwaysBounceVertical={false} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ paddingHorizontal: 16, gap: 16, marginTop: (layout === 'large' ? (24 + safeArea.top) : 8) }}>
                <HomeTopBar />
            </View>
            <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ width: 200, height: 200 }}>
                    <LottieView
                        style={{ width: 200, height: 200, alignSelf: 'center' }}
                        source={require('@/app/assets/animation_owl.json')}
                        autoPlay={true}
                        loop={false}
                    />
                </View>
                <Text style={{ fontSize: 16, color: Theme.text, paddingHorizontal: 32, opacity: 0.7, marginVertical: 8, textAlign: 'center' }}>Chats will appear once{'\n'}some bot texts you</Text>
            </View>
        </ScrollView>
    );
    const loading = (
        <ScrollView style={{ flex: 1 }} alwaysBounceVertical={false} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ paddingHorizontal: 16, gap: 16, marginTop: (layout === 'large' ? (24 + safeArea.top) : 8) }}>
                <HomeTopBar />
            </View>
            <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator color={Theme.text} />
            </View>
        </ScrollView>
    );
    const chatButton = (
        <View
            style={{
                position: 'absolute',
                bottom: safeArea.bottom,
                left: safeArea.left,
                right: safeArea.right,
                alignItems: 'flex-end',
                justifyContent: 'center',
                paddingHorizontal: 32,
                paddingBottom: 32
            }}
        >
            <Pressable
                onPress={openChat}
                style={{
                    width: 64,
                    height: 64,
                    borderRadius: 32,
                    backgroundColor: Theme.accent,
                    alignItems: 'center',
                    justifyContent: 'center',
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
                }}
            >
                <Ionicons name="search-outline" size={34} color="black" />
            </Pressable>
        </View>
    );
    return (
        <>
            <HomeHeader />
            <View style={{ alignSelf: 'stretch', flexGrow: 1, flexBasis: 0 }}>
                <ScrollView style={{ flexGrow: 1, flexBasis: 0 }}>
                    <MapView style={{ height: 250, pointerEvents: 'none' }} showsMyLocationButton={true} showsUserLocation={true} />
                    <View>
                        <View style={{ flexDirection: 'column', marginTop: 16, gap: 8 }}>
                            <Pressable
                                style={{
                                    marginHorizontal: 16,
                                    borderRadius: 16,
                                    borderWidth: 0.5,
                                    borderColor: '#272727',
                                    flexDirection: 'row',
                                    backgroundColor: Theme.panel,
                                    flexShrink: 0
                                }}
                            >
                                <Image
                                    source={{ uri: "https://files.korshakov.com/public/tmp/ComfyUI_00068_.png" }}
                                    // placeholder={{ thumbhash: memory.image.thumbhash }}
                                    style={{ width: 56, height: 56, aspectRatio: 1, borderRadius: 16, margin: 2 }}
                                />
                                <View style={{
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    borderBottomLeftRadius: 16,
                                    borderBottomRightRadius: 16
                                }}>

                                    <View style={{ flexDirection: 'row', marginBottom: 4, paddingHorizontal: 8 }}>
                                        <Text style={{ color: Theme.text }}><Text style={{ opacity: 0.7 }}>@ex3ndr</Text> </Text>
                                        <Text style={{ color: Theme.text, opacity: 0.4 }}><TimeView time={Date.now()} /></Text>
                                    </View>
                                    <Text style={{ fontSize: 16, color: Theme.text, paddingHorizontal: 8 }} numberOfLines={1}>Remarkable coffe here!</Text>
                                </View>
                            </Pressable>

                            <Pressable
                                style={{
                                    marginHorizontal: 16,
                                    borderRadius: 16,
                                    borderWidth: 0.5,
                                    borderColor: '#272727',
                                    flexDirection: 'row',
                                    backgroundColor: Theme.panel,
                                    flexShrink: 0
                                }}
                            >
                                <Image
                                    source={{ uri: "https://files.korshakov.com/public/tmp/ComfyUI_00071_.png" }}
                                    // placeholder={{ thumbhash: memory.image.thumbhash }}
                                    style={{ width: 56, height: 56, aspectRatio: 1, borderRadius: 16, margin: 2 }}
                                />
                                <View style={{
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    borderBottomLeftRadius: 16,
                                    borderBottomRightRadius: 16
                                }}>

                                    <View style={{ flexDirection: 'row', marginBottom: 4, paddingHorizontal: 8 }}>
                                        <Text style={{ color: Theme.text }}><Text style={{ opacity: 0.7 }}>@ex3ndr</Text> </Text>
                                        <Text style={{ color: Theme.text, opacity: 0.4 }}><TimeView time={Date.now()} /></Text>
                                    </View>
                                    <Text style={{ fontSize: 16, color: Theme.text, paddingHorizontal: 8 }} numberOfLines={1}>Not so good</Text>
                                </View>
                            </Pressable>

                            <Pressable
                                style={{
                                    marginHorizontal: 16,
                                    borderRadius: 16,
                                    borderWidth: 0.5,
                                    borderColor: '#272727',
                                    flexDirection: 'row',
                                    backgroundColor: Theme.panel,
                                    flexShrink: 0
                                }}
                            >
                                <Image
                                    source={{ uri: "https://files.korshakov.com/public/tmp/ComfyUI_00072_.png" }}
                                    // placeholder={{ thumbhash: memory.image.thumbhash }}
                                    style={{ width: 56, height: 56, aspectRatio: 1, borderRadius: 16, margin: 2 }}
                                />
                                <View style={{
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    borderBottomLeftRadius: 16,
                                    borderBottomRightRadius: 16,
                                    paddingRight: 8,
                                    flexGrow: 1,
                                    flexBasis: 0
                                }}>

                                    <View style={{ flexDirection: 'row', marginBottom: 4, paddingHorizontal: 8 }}>
                                        <Text style={{ color: Theme.text }}><Text style={{ opacity: 0.7 }}>@ex3ndr</Text> </Text>
                                        <Text style={{ color: Theme.text, opacity: 0.4 }}><TimeView time={Date.now()} /></Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignSelf: 'stretch' }}>
                                        <Text style={{ fontSize: 16, color: Theme.text, paddingHorizontal: 8, alignSelf: 'stretch', flexBasis: 0, flexGrow: 1 }} ellipsizeMode='tail' numberOfLines={1}>Good park with a playground in good condition!</Text>
                                    </View>
                                </View>
                            </Pressable>


                            <Pressable
                                style={{
                                    marginHorizontal: 16,
                                    borderRadius: 16,
                                    borderWidth: 0.5,
                                    borderColor: '#272727',
                                    flexDirection: 'row',
                                    backgroundColor: Theme.panel,
                                    flexShrink: 0
                                }}
                            >
                                <Image
                                    source={{ uri: "https://files.korshakov.com/public/tmp/ComfyUI_00068_.png" }}
                                    // placeholder={{ thumbhash: memory.image.thumbhash }}
                                    style={{ width: 56, height: 56, aspectRatio: 1, borderRadius: 16, margin: 2 }}
                                />
                                <View style={{
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    borderBottomLeftRadius: 16,
                                    borderBottomRightRadius: 16
                                }}>

                                    <View style={{ flexDirection: 'row', marginBottom: 4, paddingHorizontal: 8 }}>
                                        <Text style={{ color: Theme.text }}><Text style={{ opacity: 0.7 }}>@ex3ndr</Text> </Text>
                                        <Text style={{ color: Theme.text, opacity: 0.4 }}><TimeView time={Date.now()} /></Text>
                                    </View>
                                    <Text style={{ fontSize: 16, color: Theme.text, paddingHorizontal: 8 }} numberOfLines={1}>Remarkable coffe here!</Text>
                                </View>
                            </Pressable>


                            <Pressable
                                style={{
                                    marginHorizontal: 16,
                                    borderRadius: 16,
                                    borderWidth: 0.5,
                                    borderColor: '#272727',
                                    flexDirection: 'row',
                                    backgroundColor: Theme.panel,
                                    flexShrink: 0
                                }}
                            >
                                <Image
                                    source={{ uri: "https://files.korshakov.com/public/tmp/ComfyUI_00068_.png" }}
                                    // placeholder={{ thumbhash: memory.image.thumbhash }}
                                    style={{ width: 56, height: 56, aspectRatio: 1, borderRadius: 16, margin: 2 }}
                                />
                                <View style={{
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    borderBottomLeftRadius: 16,
                                    borderBottomRightRadius: 16
                                }}>

                                    <View style={{ flexDirection: 'row', marginBottom: 4, paddingHorizontal: 8 }}>
                                        <Text style={{ color: Theme.text }}><Text style={{ opacity: 0.7 }}>@ex3ndr</Text> </Text>
                                        <Text style={{ color: Theme.text, opacity: 0.4 }}><TimeView time={Date.now()} /></Text>
                                    </View>
                                    <Text style={{ fontSize: 16, color: Theme.text, paddingHorizontal: 8 }} numberOfLines={1}>Remarkable coffe here!</Text>
                                </View>
                            </Pressable>

                            <Pressable
                                style={{
                                    marginHorizontal: 16,
                                    marginVertical: 8,
                                    borderRadius: 16,
                                    borderWidth: 0.5,
                                    borderColor: '#272727',
                                    flexDirection: 'row',
                                    backgroundColor: Theme.panel,
                                    flexShrink: 0
                                }}
                            >
                                <Image
                                    source={{ uri: "https://files.korshakov.com/public/tmp/ComfyUI_00068_.png" }}
                                    // placeholder={{ thumbhash: memory.image.thumbhash }}
                                    style={{ width: 56, height: 56, aspectRatio: 1, borderRadius: 16, margin: 2 }}
                                />
                                <View style={{
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    borderBottomLeftRadius: 16,
                                    borderBottomRightRadius: 16
                                }}>

                                    <View style={{ flexDirection: 'row', marginBottom: 4, paddingHorizontal: 8 }}>
                                        <Text style={{ color: Theme.text }}><Text style={{ opacity: 0.7 }}>@ex3ndr</Text> </Text>
                                        <Text style={{ color: Theme.text, opacity: 0.4 }}><TimeView time={Date.now()} /></Text>
                                    </View>
                                    <Text style={{ fontSize: 16, color: Theme.text, paddingHorizontal: 8 }} numberOfLines={1}>Remarkable coffe here!</Text>
                                </View>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
                {/* <Feed
                    feed='smart'
                    display='large'
                    header={() => header}
                    footer={footer}
                    empty={empty}
                    loading={loading}
                /> */}
                {experimental && chatButton}
            </View>
        </>
    );
});