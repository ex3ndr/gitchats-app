//
// Parameters
//

const IS_NEXT = process.env.APP_ENV !== 'production';
const RUNTIME_VERSION = "1";

//
// Config
//

export default {
  "expo": {
    "name": "GitChats",
    "slug": "gitchats",
    "version": "1.0.0",
    "runtimeVersion": RUNTIME_VERSION,
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "dark",
    "scheme": "gitchats",
    "splash": {
      "backgroundColor": "#000"
    },
    "androidStatusBar": {
      "barStyle": "light-content",
      "backgroundColor": "#121212",
      "translucent": false
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "backgroundColor": "#121212",
      "supportsTablet": true,
      "bundleIdentifier": "com.gitchats.ios",
      "associatedDomains": ["applinks:gitchats.com"],
      "infoPlist": {
        "UIBackgroundModes": [
          "fetch",
          "remote-notification"
        ],
        "UIViewControllerBasedStatusBarAppearance": true,
        "NSMicrophoneUsageDescription": "Gitchats uses the microphone to record audio for content creation or AI."
      },
      "config": {
        "usesNonExemptEncryption": false
      }
    },
    "android": {
      "backgroundColor": "#121212",
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#242424"
      },
      "package": "com.gitchats.android",
      "intentFilters": [
        {
          "action": "VIEW",
          "autoVerify": true,
          "data": [
            {
              "scheme": "https",
              "host": "gitchats.com",
              "pathPrefix": "/"
            }
          ],
          "category": ["BROWSABLE", "DEFAULT"]
        }
      ]
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "expo-localization",
      "react-native-vision-camera",
      [
        "expo-build-properties",
        {
          "android": {
            "minSdkVersion": 31
          }
        }
      ],
      ["expo-router", {
        "root": "./sources/app/routes",
      }]
    ],
    "extra": {
      "eas": {
        "projectId": "5f5fdda0-e781-4f31-9a7a-e890cb581e3f"
      },
      "bugsnag": {
        "apiKey": "d6752ef54836994437180027a581b761"
      }
    },
    "owner": "bulkacorp",
    "updates": {
      "url": "https://u.expo.dev/5f5fdda0-e781-4f31-9a7a-e890cb581e3f"
    },
    "experiments": {
      "typedRoutes": true
    }
  }
}
