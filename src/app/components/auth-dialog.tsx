import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useAuth } from '../context/auth-context';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
  defaultView?: 'signin' | 'signup';
}

export function AuthDialog({ isOpen, onClose, defaultView = 'signin' }: AuthDialogProps) {
  const [view, setView] = useState<'signin' | 'signup'>(defaultView);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (view === 'signin') {
        const { error } = await signIn(email, password);
        if (error) {
          toast.error('Failed to sign in', { description: error.message });
        } else {
          toast.success('Signed in successfully');
          onClose();
        }
      } else {
        const { error } = await signUp(email, password, name);
        if (error) {
          toast.error('Failed to sign up', { description: error.message });
        } else {
          toast.success('Account created successfully');
          onClose();
        }
      }
    } catch (err) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleView = () => {
    setView(view === 'signin' ? 'signup' : 'signin');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{view === 'signin' ? 'Welcome Back' : 'Create Account'}</DialogTitle>
          <DialogDescription>
            {view === 'signin' 
              ? 'Enter your credentials to access your account' 
              : 'Enter your details to create a new account'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {view === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                placeholder="John Doe" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="hello@example.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="••••••••" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <Button type="submit" className="w-full bg-stone-900 hover:bg-stone-800" disabled={isLoading}>
              {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
              {view === 'signin' ? 'Sign In' : 'Create Account'}
            </Button>
            
            <div className="text-center text-sm text-stone-500 mt-2">
              {view === 'signin' ? "Don't have an account? " : "Already have an account? "}
              <button 
                type="button" 
                onClick={toggleView}
                className="text-stone-900 font-medium hover:underline"
              >
                {view === 'signin' ? 'Sign up' : 'Sign in'}
              </button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
