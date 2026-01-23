import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

interface GoogleAuthProps {
  onSuccess: (user: { name: string; email: string; picture: string }) => void;
  onError: () => void;
}

interface GoogleCredentialResponse {
  credential?: string;
}

interface GoogleUserInfo {
  name: string;
  email: string;
  picture: string;
}

export function GoogleAuth({ onSuccess, onError }: GoogleAuthProps) {
  // Replace with your Google OAuth Client ID
  const clientId = 'YOUR_GOOGLE_CLIENT_ID_HERE';

  const handleSuccess = (credentialResponse: GoogleCredentialResponse) => {
    if (credentialResponse.credential) {
      const decoded: any = jwtDecode(credentialResponse.credential);
      const userInfo: GoogleUserInfo = {
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
      };
      onSuccess(userInfo);
    }
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={onError}
        useOneTap
        theme="outline"
        size="large"
        text="signin_with"
        shape="rectangular"
      />
    </GoogleOAuthProvider>
  );
}
