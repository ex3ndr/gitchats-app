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
    "name": "Gitchats",
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
        "backgroundColor": "#000"
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
        "projectId": "7d925825-bdf8-4ee0-bff3-f2d873dbff37"
      },
      "bugsnag": {
        "apiKey": "d6752ef54836994437180027a581b761"
      }
    },
    "owner": "bulkacorp",
    "updates": {
      "url": "https://u.expo.dev/7d925825-bdf8-4ee0-bff3-f2d873dbff37"
    },
    "experiments": {
      "typedRoutes": true
    }
  }
}
