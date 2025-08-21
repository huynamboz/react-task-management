# Store API Integration Guide

## Tổng quan

Hệ thống đã được tích hợp để kết hợp React Query với Context API store, cho phép:

1. **Optimistic Updates**: UI cập nhật ngay lập tức khi user thực hiện action
2. **Automatic Sync**: Data tự động đồng bộ giữa API và store
3. **Error Handling**: Rollback tự động khi API call thất bại
4. **Loading States**: Quản lý trạng thái loading cho từng action

## Cấu trúc Files

```
src/store/
├── api-actions.ts      # React Query mutations với optimistic updates
├── hooks.ts           # Custom hook tích hợp store với API
├── sync-hooks.ts      # Hook đồng bộ data từ API vào store
├── types.ts           # Type definitions
├── reducer.ts         # Reducer cho store
└── index.ts           # Exports
```

## Cách sử dụng

### 1. Setup trong Component

```tsx
import { useProjectStore, useSyncDataToStore } from '@/store';

const MyComponent = () => {
  // Sync data từ API vào store
  const { isLoading: isSyncing } = useSyncDataToStore();
  
  // Sử dụng store với API integration
  const {
    sprints,
    userStories,
    createUserStory,
    createSprint,
    isLoading,
    errors
  } = useProjectStore();

  // ... component logic
};
```

### 2. Create User Story

```tsx
const handleCreateUserStory = async () => {
  try {
    await createUserStory({
      sprintId: selectedSprint.id,
      title: "New User Story",
      description: "Description here",
      priority: "medium",
      points: 3,
      creator: "Current User"
    });
    // Store sẽ tự động cập nhật và API sẽ được gọi
  } catch (error) {
    // Error handling
  }
};
```

### 3. Loading và Error States

```tsx
// Loading states
const { isLoading } = useProjectStore();
if (isLoading.createUserStory) {
  return <div>Creating user story...</div>;
}

// Error states
const { errors } = useProjectStore();
if (errors.createUserStory) {
  return <div>Error: {errors.createUserStory.message}</div>;
}
```

## Features

### Optimistic Updates

- UI cập nhật ngay lập tức khi user click
- Nếu API thất bại, UI sẽ rollback về trạng thái cũ
- User experience mượt mà hơn

### Automatic Data Sync

- `useSyncDataToStore()` tự động đồng bộ data từ API vào store
- Không cần manual dispatch actions

### Error Handling

- Tự động rollback khi API call thất bại
- Error states được quản lý cho từng action
- User được thông báo lỗi rõ ràng

### Loading States

- Loading state riêng cho từng action
- UI có thể hiển thị loading indicator phù hợp

## Best Practices

### 1. Sử dụng try-catch

```tsx
const handleAction = async () => {
  try {
    await createUserStory(userStoryData);
    // Success handling
  } catch (error) {
    // Error handling
    console.error('Failed to create user story:', error);
  }
};
```

### 2. Disable buttons khi loading

```tsx
<Button 
  onClick={handleCreateUserStory}
  disabled={isLoading.createUserStory}
>
  {isLoading.createUserStory ? 'Creating...' : 'Create User Story'}
</Button>
```

### 3. Hiển thị errors

```tsx
{errors.createUserStory && (
  <p className="text-red-500">
    Error: {errors.createUserStory.message}
  </p>
)}
```

### 4. Sync data ở component level cao

```tsx
// Trong App.tsx hoặc layout component
const App = () => {
  useSyncDataToStore(); // Sync data một lần ở level cao
  
  return (
    <div>
      {/* Child components */}
    </div>
  );
};
```

## API Actions Available

### User Stories
- `createUserStory(userStory)`
- `updateUserStory(userStory)`
- `deleteUserStory(sprintId, userStoryId)`

### Sprints
- `createSprint(sprint)`
- `updateSprint(sprint)`
- `deleteSprint(sprintId)`

### UI Actions
- `selectSprint(sprintId)`
- `selectUserStory(userStoryId)`
- `setFilter(filter)`

## State Structure

```tsx
{
  // Data
  sprints: Sprint[],
  userStories: { sprintId: string, stories: UserStory[] }[],
  selectedSprint: Sprint | null,
  selectedUserStory: UserStory | null,
  filters: FilterState,
  
  // Actions
  createUserStory: (userStory) => Promise<UserStory>,
  updateUserStory: (userStory) => Promise<UserStory>,
  deleteUserStory: (sprintId, userStoryId) => Promise<void>,
  // ... other actions
  
  // Loading states
  isLoading: {
    createUserStory: boolean,
    updateUserStory: boolean,
    deleteUserStory: boolean,
    // ... other loading states
  },
  
  // Error states
  errors: {
    createUserStory: Error | null,
    updateUserStory: Error | null,
    deleteUserStory: Error | null,
    // ... other error states
  }
}
```

## Migration từ use-api.ts

Thay vì sử dụng trực tiếp `useCreateUserStory` từ `use-api.ts`, hãy sử dụng:

```tsx
// Cũ
const { mutate: createUserStory } = useCreateUserStory();

// Mới
const { createUserStory } = useProjectStore();
```

Lợi ích:
- Tự động update store
- Loading và error states được quản lý
- Optimistic updates
- Type safety tốt hơn
