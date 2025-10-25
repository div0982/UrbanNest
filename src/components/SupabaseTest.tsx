import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SupabaseImageUpload from '@/components/SupabaseImageUpload';
import { STORAGE_BUCKETS } from '@/lib/supabase';

const SupabaseTest: React.FC = () => {
  const [uploadedUrl, setUploadedUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [testResults, setTestResults] = useState<{
    connection: boolean | null;
    buckets: boolean | null;
    upload: boolean | null;
  }>({
    connection: null,
    buckets: null,
    upload: null
  });

  const handleUploadSuccess = (url: string) => {
    setUploadedUrl(url);
    setError('');
    setTestResults(prev => ({ ...prev, upload: true }));
    console.log('✅ Supabase upload successful:', url);
  };

  const handleUploadError = (error: string) => {
    setError(`❌ Supabase upload failed: ${error}`);
    setTestResults(prev => ({ ...prev, upload: false }));
    console.error('❌ Supabase upload failed:', error);
  };

  const testSupabaseConnection = async () => {
    try {
      const { supabase } = await import('@/lib/supabase');
      
      // Test connection by listing buckets
      const { data, error } = await supabase.storage.listBuckets();
      
      if (error) {
        throw error;
      }
      
      setTestResults(prev => ({ ...prev, connection: true }));
      console.log('✅ Supabase connection successful');
      
      // Check if required buckets exist
      const bucketNames = data.map(bucket => bucket.name);
      const hasRequiredBuckets = Object.values(STORAGE_BUCKETS).every(
        bucket => bucketNames.includes(bucket)
      );
      
      setTestResults(prev => ({ ...prev, buckets: hasRequiredBuckets }));
      
      if (hasRequiredBuckets) {
        console.log('✅ All required buckets exist');
      } else {
        console.warn('⚠️ Some required buckets are missing');
      }
      
    } catch (error) {
      setTestResults(prev => ({ ...prev, connection: false }));
      console.error('❌ Supabase connection failed:', error);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Supabase Storage Integration Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Connection Test */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Connection Tests:</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm">
                {testResults.connection === null ? '⏳' : testResults.connection ? '✅' : '❌'} Supabase Connection
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm">
                {testResults.buckets === null ? '⏳' : testResults.buckets ? '✅' : '❌'} Required Buckets
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm">
                {testResults.upload === null ? '⏳' : testResults.upload ? '✅' : '❌'} Upload Test
              </span>
            </div>
          </div>
          <Button onClick={testSupabaseConnection} variant="outline" size="sm">
            Test Connection
          </Button>
        </div>

        {/* Upload Component */}
        <SupabaseImageUpload
          onUploadSuccess={handleUploadSuccess}
          onUploadError={handleUploadError}
          bucket={STORAGE_BUCKETS.PROPERTIES}
          folder="test"
        />

        {/* Results */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {uploadedUrl && (
          <div className="space-y-2">
            <div className="p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-600">✅ Upload successful!</p>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-2">Uploaded Image:</p>
              <img 
                src={uploadedUrl} 
                alt="Uploaded" 
                className="w-full h-48 object-cover rounded-md"
              />
            </div>
            
            <div>
              <p className="text-sm font-medium mb-1">Image URL:</p>
              <p className="text-xs text-gray-600 break-all">{uploadedUrl}</p>
            </div>
          </div>
        )}

        {/* Setup Instructions */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
          <h4 className="text-sm font-medium text-blue-800 mb-2">Setup Required:</h4>
          <ol className="text-xs text-blue-700 space-y-1 list-decimal list-inside">
            <li>Create Supabase project at <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="underline">supabase.com</a></li>
            <li>Add credentials to <code>.env.local</code> file</li>
            <li>Create storage buckets: properties, profiles, temp</li>
            <li>Set up storage policies for public access</li>
            <li>Test the connection above</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupabaseTest;
