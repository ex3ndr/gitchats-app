import { MDXComponents, MDXStyles } from '@bacons/mdx';
import { Theme } from '../theme';
import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export const MDXTheme = (props: { children: any }) => {
    return (
        <MDXStyles
            p={{ color: Theme.text, fontSize: 16, lineHeight: 24, marginBottom: 10 }}
            h1={{
                color: Theme.text,
                fontSize: 32,
                lineHeight: 40,
                fontWeight: '600',
                marginBottom: 16
            }}
            h2={{
                fontSize: 24,
                color: Theme.text,
                fontWeight: '600',
                marginBottom: 16,
                marginTop: 32
            }}
            h3={{
                fontSize: 24,
                color: Theme.text,
                fontWeight: '600',
                marginBottom: 16
            }}
            h4={{
                fontSize: 24,
                color: Theme.text,
                fontWeight: '600'
            }}
            h5={{
                fontSize: 24,
                color: Theme.text,
                fontWeight: '600'
            }}
            h6={{
                fontSize: 24,
                color: Theme.text,
                fontWeight: '600'
            }}
            ul={{
                marginBottom: 32,
            }}
            ol={{
                marginBottom: 32,
            }}
            li={{
                fontSize: 16,
                lineHeight: 30,
                color: '#f2f5f7',
            }}
            a={{
                fontWeight: '600'
            }}
        >
            <MDXComponents
                a={({ href, children, style, className, ...props }) => {
                    return (
                        <Link
                            href={href}
                            target={href.startsWith('http') ? '_blank' : undefined}
                            style={[style]}
                            className={className}
                            children={children}
                        />
                    );
                }}
                li={({
                    firstChild,
                    lastChild,
                    parentName,
                    prevSibling,
                    firstOfType,
                    style,
                    ...props
                }) => (
                    <li
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                        }}
                    >
                        <View
                            style={{
                                marginTop: 14,
                                marginRight: 8,
                                width: 4,
                                height: 4,
                                borderRadius: 2,
                                backgroundColor: Theme.text,
                            }}
                        />
                        <Text {...props} style={[style, { display: 'block' }]} />
                    </li>
                )}
            >
                {props.children}
            </MDXComponents>
        </MDXStyles>
    )
}