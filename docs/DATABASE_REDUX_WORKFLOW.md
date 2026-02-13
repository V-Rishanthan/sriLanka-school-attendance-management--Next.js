# 🎓 Database & Redux Workflow Documentation
## Sri Lanka School Attendance Management System

---

## 📋 Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Technology Stack](#technology-stack)
3. [Data Flow](#data-flow)
4. [Detailed Workflows](#detailed-workflows)
5. [Code Examples](#code-examples)
6. [Best Practices](#best-practices)

---

## 🏗️ Architecture Overview

Your application follows a **3-Layer Architecture**:

```
┌─────────────────────────────────────────────────────────┐
│                    1. UI LAYER (React)                  │
│  Components: AddStudentForm, DailyAttendance, etc.     │
│  Location: /app, /components                           │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ↓ (dispatch actions)
┌─────────────────────────────────────────────────────────┐
│              2. STATE LAYER (Redux Toolkit)             │
│  Store: attendanceSlice with async thunks               │
│  Location: /redux                                       │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ↓ (HTTP requests)
┌─────────────────────────────────────────────────────────┐
│         3. DATA LAYER (API Routes + MongoDB)            │
│  API: /api/students, /api/attendance                    │
│  Database: MongoDB Atlas (Cloud)                        │
│  Location: /app/api, /models, /lib                      │
└─────────────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **Redux Toolkit** - State management
- **TypeScript** - Type safety

### Backend
- **Next.js API Routes** - Serverless backend
- **Mongoose** - MongoDB ODM (Object Data Modeling)
- **MongoDB Atlas** - Cloud database

### Styling
- **Tailwind CSS** - Utility-first CSS
- **Shadcn/UI** - Component library

---

## 🔄 Data Flow

### Complete Request-Response Cycle

```
┌──────────────────────────────────────────────────────────┐
│ STEP 1: User Interaction                                │
│ User clicks "Register Student" button                   │
└─────────────────┬────────────────────────────────────────┘
                  ↓
┌──────────────────────────────────────────────────────────┐
│ STEP 2: Component Dispatches Action                     │
│ dispatch(addStudentAsync({ name: "John", ... }))        │
└─────────────────┬────────────────────────────────────────┘
                  ↓
┌──────────────────────────────────────────────────────────┐
│ STEP 3: Redux Thunk Executes                            │
│ - Sets loading = true                                    │
│ - Makes HTTP POST to /api/students                       │
└─────────────────┬────────────────────────────────────────┘
                  ↓
┌──────────────────────────────────────────────────────────┐
│ STEP 4: API Route Receives Request                      │
│ - Connects to MongoDB                                    │
│ - Validates data                                         │
│ - Calls Student.create(data)                             │
└─────────────────┬────────────────────────────────────────┘
                  ↓
┌──────────────────────────────────────────────────────────┐
│ STEP 5: MongoDB Processes                                │
│ - Validates against schema                               │
│ - Saves to database                                      │
│ - Returns saved document with _id                        │
└─────────────────┬────────────────────────────────────────┘
                  ↓
┌──────────────────────────────────────────────────────────┐
│ STEP 6: API Route Returns Response                      │
│ - Sends JSON: { success: true, data: student }           │
└─────────────────┬────────────────────────────────────────┘
                  ↓
┌──────────────────────────────────────────────────────────┐
│ STEP 7: Redux Updates State                             │
│ - Sets loading = false                                   │
│ - Adds student to state.students array                   │
└─────────────────┬────────────────────────────────────────┘
                  ↓
┌──────────────────────────────────────────────────────────┐
│ STEP 8: UI Re-renders                                    │
│ - Table automatically shows new student                  │
│ - Toast notification appears                             │
└──────────────────────────────────────────────────────────┘
```

---

## 📚 Detailed Workflows

### Workflow 1: Adding a New Student

#### 1.1 User Interface (AddStudentForm.tsx)
```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    // Dispatch Redux action
    await dispatch(addStudentAsync({
      studentId: "STU-A1B2",
      name: "John Doe",
      grade: "10",
      class: "10-A"
    })).unwrap();
    
    // Show success message
    toast.success("Student added successfully!");
    
    // Reset form
    setFormData({ ... });
  } catch (error) {
    toast.error("Failed to add student");
  }
};
```

#### 1.2 Redux Thunk (attendanceSlice.ts)
```tsx
export const addStudentAsync = createAsyncThunk(
  "attendance/addStudent",
  async (student: Student) => {
    const response = await fetch("/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    });
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error);
    }
    
    return data.data; // Returns the saved student
  }
);
```

#### 1.3 API Route (app/api/students/route.ts)
```tsx
export async function POST(request: Request) {
  // Connect to MongoDB
  await dbConnect();
  
  try {
    // Parse request body
    const body = await request.json();
    
    // Create student in database
    const student = await Student.create(body);
    
    // Return success response
    return NextResponse.json({ 
      success: true, 
      data: student 
    });
  } catch (error: any) {
    // Handle errors (duplicate studentId, validation, etc.)
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 400 });
  }
}
```

#### 1.4 Mongoose Model (models/Student.ts)
```tsx
const StudentSchema: Schema = new Schema({
  studentId: { 
    type: String, 
    required: true, 
    unique: true  // Prevents duplicate IDs
  },
  name: { 
    type: String, 
    required: true 
  },
  grade: { 
    type: String, 
    required: true 
  },
  class: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

export default mongoose.models.Student || 
  mongoose.model<IStudent>("Student", StudentSchema);
```

#### 1.5 Redux State Update
```tsx
extraReducers: (builder) => {
  builder
    // When request starts
    .addCase(addStudentAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    // When request succeeds
    .addCase(addStudentAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.students.push(action.payload); // Add to array
    })
    // When request fails
    .addCase(addStudentAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed";
    });
}
```

---

### Workflow 2: Fetching Students

#### 2.1 Component Mount (StudentManagement.tsx)
```tsx
export default function StudentManagement() {
  const dispatch = useDispatch<AppDispatch>();
  const { students, loading } = useSelector(
    (state: RootState) => state.attendance
  );

  // Fetch students when component mounts
  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table>
          {students.map(student => (
            <TableRow key={student.studentId}>
              <TableCell>{student.name}</TableCell>
            </TableRow>
          ))}
        </Table>
      )}
    </div>
  );
}
```

#### 2.2 Redux Thunk
```tsx
export const fetchStudents = createAsyncThunk(
  "attendance/fetchStudents",
  async () => {
    const response = await fetch("/api/students");
    const data = await response.json();
    return data.data; // Array of students
  }
);
```

#### 2.3 API Route (GET)
```tsx
export async function GET() {
  await dbConnect();
  
  try {
    // Find all students, sorted by creation date
    const students = await Student.find({})
      .sort({ createdAt: -1 });
    
    return NextResponse.json({ 
      success: true, 
      data: students 
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 400 });
  }
}
```

#### 2.4 MongoDB Query
```javascript
// MongoDB executes:
db.students.find({}).sort({ createdAt: -1 })

// Returns:
[
  {
    _id: ObjectId("..."),
    studentId: "STU-A1B2",
    name: "John Doe",
    grade: "10",
    class: "10-A",
    createdAt: ISODate("2026-02-13T...")
  },
  // ... more students
]
```

---

### Workflow 3: Saving Attendance

#### 3.1 Mark Attendance (DailyAttendancePage.tsx)
```tsx
const saveAllAttendance = async () => {
  const dateStr = format(date, "yyyy-MM-dd");
  let successCount = 0;
  
  try {
    // Loop through each student's attendance
    for (const studentId of Object.keys(attendance)) {
      const status = attendance[studentId];
      
      await dispatch(saveAttendanceAsync({
        studentId,
        date: dateStr,
        status: status === "present" ? "Present" : 
                status === "absent" ? "Absent" : "Late"
      })).unwrap();
      
      successCount++;
    }
    
    toast.success(`Saved attendance for ${successCount} students`);
  } catch (error) {
    toast.error("Failed to save some attendance records");
  }
};
```

#### 3.2 Redux Thunk
```tsx
export const saveAttendanceAsync = createAsyncThunk(
  "attendance/save",
  async (attendance: Attendance) => {
    const response = await fetch("/api/attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(attendance),
    });
    
    const data = await response.json();
    return data.data;
  }
);
```

#### 3.3 API Route with Upsert
```tsx
export async function POST(request: Request) {
  await dbConnect();
  
  try {
    const body = await request.json();
    const { studentId, date, status } = body;
    
    // Upsert: Update if exists, create if not
    const attendance = await Attendance.findOneAndUpdate(
      { studentId, date },  // Find by student + date
      { status },           // Update status
      { 
        new: true,          // Return updated document
        upsert: true        // Create if doesn't exist
      }
    );
    
    return NextResponse.json({ 
      success: true, 
      data: attendance 
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 400 });
  }
}
```

#### 3.4 Mongoose Model (Attendance)
```tsx
const AttendanceSchema: Schema = new Schema({
  studentId: { type: String, required: true },
  date: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["Present", "Absent", "Late"], 
    required: true 
  },
  createdAt: { type: Date, default: Date.now },
});

// Compound index: Ensures one record per student per day
AttendanceSchema.index(
  { studentId: 1, date: 1 }, 
  { unique: true }
);
```

---

## 💡 Key Concepts

### 1. Async Thunks
**What they are:**
- Special Redux functions that handle asynchronous operations
- Automatically dispatch `pending`, `fulfilled`, `rejected` actions

**Why we use them:**
- ✅ Automatic loading state management
- ✅ Error handling built-in
- ✅ Clean separation of concerns
- ✅ Type-safe with TypeScript

**Example:**
```tsx
createAsyncThunk("name", async (data) => {
  // This code runs OUTSIDE Redux
  const response = await fetch("/api/...");
  return response.json();
});
```

### 2. MongoDB Connection Singleton
**Problem:** Next.js hot reload creates multiple database connections

**Solution:** Reuse the same connection
```tsx
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn; // Reuse existing
  }
  
  cached.promise = mongoose.connect(MONGODB_URI);
  cached.conn = await cached.promise;
  
  return cached.conn;
}
```

### 3. Mongoose Schemas
**Purpose:** Define data structure and validation rules

**Benefits:**
- ✅ Type safety at database level
- ✅ Automatic validation
- ✅ Indexes for fast queries
- ✅ Default values

**Example:**
```tsx
const StudentSchema = new Schema({
  studentId: { 
    type: String, 
    required: true,
    unique: true  // Database enforces uniqueness
  },
  name: { 
    type: String, 
    required: true,
    trim: true    // Removes whitespace
  }
});
```

---

## 🎯 Best Practices

### 1. Error Handling
```tsx
// Always use try-catch with async thunks
try {
  await dispatch(addStudentAsync(data)).unwrap();
  toast.success("Success!");
} catch (error) {
  toast.error("Failed!");
  console.error(error);
}
```

### 2. Loading States
```tsx
// Show loading indicator
const { loading } = useSelector(state => state.attendance);

return loading ? <Spinner /> : <StudentTable />;
```

### 3. Data Validation
```tsx
// Validate on both client and server
// Client: Prevent unnecessary requests
if (!formData.name || !formData.grade) {
  return; // Don't submit
}

// Server: Security (never trust client)
if (!body.name || !body.grade) {
  return NextResponse.json({ error: "Invalid data" });
}
```

### 4. Optimistic Updates (Advanced)
```tsx
// Update UI immediately, rollback if fails
dispatch(addStudent(newStudent)); // Optimistic
try {
  await saveToDatabase(newStudent);
} catch (error) {
  dispatch(removeStudent(newStudent.id)); // Rollback
}
```

---

## 📊 State Structure

### Redux State Shape
```typescript
{
  attendance: {
    students: [
      {
        _id: "...",
        studentId: "STU-A1B2",
        name: "John Doe",
        grade: "10",
        class: "10-A",
        createdAt: "2026-02-13T..."
      }
    ],
    attendance: [
      {
        _id: "...",
        studentId: "STU-A1B2",
        date: "2026-02-13",
        status: "Present",
        createdAt: "2026-02-13T..."
      }
    ],
    loading: false,
    error: null
  }
}
```

---

## 🔐 Security Considerations

### 1. Environment Variables
```bash
# .env.local (NEVER commit to Git)
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/...
```

### 2. API Route Protection
```tsx
// Add authentication (future enhancement)
export async function POST(request: Request) {
  const session = await getSession(request);
  
  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" }, 
      { status: 401 }
    );
  }
  
  // ... rest of code
}
```

### 3. Input Sanitization
```tsx
// Prevent MongoDB injection
const sanitizedInput = body.name.replace(/[<>]/g, '');
```

---

## 🚀 Performance Optimization

### 1. Indexes
```tsx
// Speed up queries
StudentSchema.index({ studentId: 1 });
StudentSchema.index({ grade: 1, class: 1 });
```

### 2. Pagination (Future)
```tsx
// Don't load all students at once
const students = await Student.find({})
  .limit(50)
  .skip(page * 50);
```

### 3. Caching (Future)
```tsx
// Cache frequently accessed data
const cachedStudents = await redis.get("students");
if (cachedStudents) return cachedStudents;
```

---

## 🎓 Summary

### Data Flow in One Sentence:
**User clicks button → Redux dispatches action → API route processes → MongoDB saves/retrieves → Redux updates state → UI re-renders**

### Key Takeaways:
1. **Redux** = In-memory state (fast, temporary)
2. **MongoDB** = Persistent storage (permanent)
3. **API Routes** = Bridge between them
4. **Async Thunks** = Handle async operations cleanly

### Restaurant Analogy:
- **UI** = Customer (places order)
- **Redux** = Waiter (remembers order)
- **API Route** = Kitchen (prepares food)
- **MongoDB** = Refrigerator (stores ingredients)

---

## 📖 Further Reading

- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [Mongoose Docs](https://mongoosejs.com/)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [MongoDB Atlas](https://www.mongodb.com/atlas)

---

**Document Version:** 1.0  
**Last Updated:** February 13, 2026  
**Author:** AI Assistant for V-Rishanthan
