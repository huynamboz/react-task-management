# React Query Setup

Simple React Query implementation for the task manager app.

## What's Included

- **Query Client**: Basic configuration in `src/lib/query-client.ts`
- **Provider**: Wraps the app in `src/providers/query-provider.tsx`
- **Hooks**: Simple API hooks in `src/hooks/use-api.ts`
- **Example**: Basic usage in `src/components/example-query-component.tsx`

## Usage

### Fetch Data
```typescript
import { useUserStories } from '@/hooks/use-api';

function MyComponent() {
  const { data, isLoading, error } = useUserStories();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.map(item => <div key={item.id}>{item.title}</div>)}
    </div>
  );
}
```

### Create Data
```typescript
import { useCreateUserStory } from '@/hooks/use-api';

function MyComponent() {
  const createStory = useCreateUserStory();

  const handleCreate = async () => {
    await createStory.mutateAsync({
      title: 'New Story',
      description: 'Description',
      priority: 'medium',
      status: 'todo',
    });
  };

  return (
    <button onClick={handleCreate} disabled={createStory.isPending}>
      {createStory.isPending ? 'Creating...' : 'Create'}
    </button>
  );
}
```

## Available Hooks

- `useUserStories()` - Get all user stories
- `useSprints()` - Get all sprints
- `useCreateUserStory()` - Create a user story
- `useCreateSprint()` - Create a sprint

That's it! Simple and straightforward.
