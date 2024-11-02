import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ChatPanel } from '@/components/chat/ChatPanel';

export default async function ChatPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 relative">
        <ChatPanel id={null} />
      </div>
    </div>
  );
}