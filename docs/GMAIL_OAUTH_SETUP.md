# Gmail OAuth Integration Setup

This document explains how to set up Gmail OAuth authentication in the Medicine Reminder App using Clerk.

## Overview

The app now supports Gmail OAuth login alongside traditional email/password authentication, providing users with a seamless sign-in experience using their Google accounts.

## Features Added

- ✅ Google OAuth sign-in on login screen
- ✅ Google OAuth sign-up on registration screen  
- ✅ Consistent UI with dividers and proper styling
- ✅ Loading states and error handling
- ✅ Integration with existing Clerk authentication

## Implementation Details

### 1. Dependencies Used

- `@clerk/clerk-expo` - Authentication provider
- `expo-web-browser` - OAuth flow completion
- Existing UI components (react-native-paper, expo-image)

### 2. Files Modified

- `app/(auth)/sign-in.jsx` - Added Google OAuth sign-in
- `app/(auth)/sign-up.jsx` - Added Google OAuth sign-up  
- `app/_layout.jsx` - Updated Clerk provider configuration

### 3. Key Components

#### OAuth Hook
```javascript
const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })
```

#### OAuth Handler
```javascript
const onGoogleSignIn = React.useCallback(async () => {
  try {
    setLoading(true)
    const { createdSessionId, setActive } = await startOAuthFlow()
    
    if (createdSessionId) {
      setActive({ session: createdSessionId })
    }
  } catch (err) {
    console.error('OAuth error', err)
    Alert.alert('Sign in failed', 'Please try again')
  } finally {
    setLoading(false)
  }
}, [startOAuthFlow])
```

## Setup Instructions

### 1. Clerk Dashboard Configuration

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Select your application
3. Navigate to "Social Providers" in the sidebar
4. Enable Google OAuth provider
5. Configure Google OAuth settings:
   - Add your Google Client ID
   - Add your Google Client Secret
   - Set redirect URIs

### 2. Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Configure OAuth consent screen
6. Add authorized redirect URIs:
   - For development: `https://clerk.dev/oauth_callback`
   - For production: `https://your-app.clerk.accounts.dev/oauth_callback`

### 3. Environment Variables

Ensure your `.env` file contains:
```
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
```

### 4. Expo Configuration

In your `app.json` or `expo.json`, ensure you have proper scheme configuration:
```json
{
  "expo": {
    "scheme": "your-app-scheme",
    "platforms": ["ios", "android", "web"]
  }
}
```

## Testing

### Local Development
1. Run `npm start` or `expo start`
2. Test on both simulator and physical device
3. Verify OAuth flow completes successfully
4. Check that user data is properly stored in Clerk

### Production Testing
1. Deploy to Expo/App Store/Play Store
2. Test OAuth flow in production environment
3. Verify redirect URIs are correctly configured

## UI/UX Improvements

### Visual Design
- Clean Google button with official Google logo
- Consistent spacing and styling with existing components
- Proper loading states during OAuth flow
- "or" divider between traditional and OAuth login

### User Experience
- Reduced friction - one-tap Google sign-in
- Familiar Google OAuth flow
- Automatic account creation for new users
- Seamless integration with existing app navigation

## Error Handling

The implementation includes comprehensive error handling:
- Network errors during OAuth flow
- User cancellation of OAuth flow
- Invalid credentials or expired tokens
- Proper fallback to traditional login methods

## Security Considerations

- OAuth tokens are securely managed by Clerk
- No sensitive credentials stored locally
- Proper HTTPS redirect URIs
- Expo SecureStore integration via Clerk

## Future Enhancements

Potential improvements for future versions:
- Additional OAuth providers (Apple, Facebook, etc.)
- Social account linking for existing users
- Profile picture integration from Google account
- Google calendar integration for medication reminders

## Troubleshooting

### Common Issues

1. **OAuth flow not completing**
   - Check redirect URIs in Google Cloud Console
   - Verify Clerk provider configuration
   - Ensure proper scheme configuration in Expo

2. **"Invalid client" error**
   - Verify Google Client ID and Secret in Clerk
   - Check that Google+ API is enabled
   - Confirm OAuth consent screen is configured

3. **Development vs Production differences**
   - Use different redirect URIs for each environment
   - Test thoroughly on physical devices
   - Verify environment variables are properly set

### Debug Steps

1. Check Clerk dashboard logs
2. Monitor network requests in development tools
3. Verify Google Cloud Console activity logs
4. Test with different Google accounts

## Support

For issues with this implementation:
1. Check Clerk documentation: https://clerk.com/docs
2. Google OAuth documentation: https://developers.google.com/identity/protocols/oauth2
3. Expo OAuth guide: https://docs.expo.dev/guides/authentication/