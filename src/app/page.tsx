import ProtectedRoute from '@/components/ProtectedRoute';
const AccountPage: React.FC = () => {

  return (
    <ProtectedRoute>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
          <h1 style={{ textAlign: 'center' }}>Protected Page</h1>
          <p style={{ textAlign: 'center' }}>
            Protected Page.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
          </div>
        </div>
    </ProtectedRoute>
  );
};

export default AccountPage;
