import { ScrollView } from "react-native";
import Document from "./privacy.mdx";
import { MDXTheme } from "@/app/components/MDXTheme";
export default function Privacy() {
    return (
        <ScrollView style={{ padding: 64, flexDirection: 'column' }}>
            <MDXTheme>
                <Document />
            </MDXTheme>
        </ScrollView>
    )
}