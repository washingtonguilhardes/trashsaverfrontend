This is a starter template for [Learn Next.js](https://nextjs.org/learn).

```tsx

function Alert() {
  const [messages, setMessages] = useState<string[]>([]);
  const subscribe = useCallback(async () => {
    const connection = await createSignalRConnection('local');
    connection.on('notifications', nextMessage =>
      setMessages(prev => [...prev, JSON.stringify(nextMessage)])
    );
    connection.onclose(() => console.log('signalr disconnected'));
    connection.onreconnecting(err => console.log('err reconnecting  ', err));
    connection.start().catch(console.error);
  }, []);
  useEffect(() => {
    subscribe();
  }, [subscribe]);
  return (
    <div>
      {messages.map(message => (
        <div key={message}>{message}</div>
      ))}
    </div>
  );
}
```
