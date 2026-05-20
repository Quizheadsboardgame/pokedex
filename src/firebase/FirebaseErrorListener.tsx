'use client';

import { useEffect } from 'react';
import { errorEmitter } from './error-emitter';
import { FirestorePermissionError } from './errors';
import { toast } from '@/hooks/use-toast';

export function FirebaseErrorListener() {
  useEffect(() => {
    const handlePermissionError = (error: FirestorePermissionError) => {
      toast({
        variant: "destructive",
        title: "Security Protocol Denied",
        description: `Operation '${error.context.operation}' at ${error.context.path} was rejected by Pokedex Security Rules.`,
      });
    };

    errorEmitter.on('permission-error', handlePermissionError);
    return () => {
      errorEmitter.off('permission-error', handlePermissionError);
    };
  }, []);

  return null;
}
