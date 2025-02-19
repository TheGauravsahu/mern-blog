import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <Loader2 className="animate-spin text-primary" size={48} />
        </div>
    );
};

export default LoadingSpinner;