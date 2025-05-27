# React Hooks: `useState`, `useRef` và `useLayoutEffect`

## 1. `useState` là gì?

- `useState` là một React Hook được giới thiệu từ React 16.8, cho phép bạn thêm biến trạng thái (state) vào Function Component (trước đây chỉ Class Component mới có state).
- Khi state thay đổi, component sẽ **re-render** (vẽ lại giao diện) để cập nhật giá trị mới.

### 1.1 Nguyên lý hoạt động

- Khi gọi `useState(initialValue)`, React tạo ra một biến lưu trữ giá trị state cho mỗi lần render của component.
- React giữ một "danh sách state riêng biệt" cho mỗi component, đảm bảo đúng state được dùng ở đúng component.

### 1.2 Cách khai báo

```jsx
const [state, setState] = useState(initialValue);
```

- `state`: Biến lưu trữ giá trị hiện tại.
- `setState`: Hàm dùng để thay đổi giá trị state. Mỗi lần gọi, component sẽ re-render.
- `initialValue`: Giá trị khởi tạo của state (có thể là số, chuỗi, mảng, object...).

Ví dụ:

```jsx
const [name, setName] = useState('ChatGPT');
```

### 1.3 Cách cập nhật state

a. Cập nhật trực tiếp

```jsx
setState(newValue);
```

b. Cập nhật dựa trên giá trị trước

```jsx
setState(prevState => newValueBasedOnPrevState);
```

Ví dụ:

```jsx
setCount(prevCount => prevCount + 1);
```

### 1.4 Tính chất & lưu ý khi dùng `useState`

- **Bất đồng bộ**: `setState` **không** cập nhật ngay lập tức.
- State chỉ có tác dụng trong phạm vi component.
- Có thể khai báo nhiều biến state trong một component.
- Khi cập nhật state dạng object/array, cần sao chép object/array mới để tránh mutate trực tiếp.

Ví dụ cập nhật object:

```jsx
const [user, setUser] = useState({ name: '', age: 0 });
setUser(prevUser => ({ ...prevUser, name: 'New Name' }));
```

### 1.5 Quy tắc sử dụng `useState`

- Chỉ gọi `useState` ở đầu function component, không gọi trong vòng lặp, điều kiện hoặc function con.
- Thứ tự gọi các hook phải luôn giống nhau qua mỗi lần render.

---

## 2. Hook `useRef` và `useLayoutEffect`

### 2.1 Hook `useRef`

#### a. Khái niệm

- `useRef` cho phép lưu trữ một giá trị bất kỳ qua nhiều lần render mà không bị mất.
- Tham chiếu tới DOM node để thao tác trực tiếp.
- Không làm component re-render khi giá trị `.current` thay đổi.

#### b. Cú pháp

```jsx
const myRef = useRef(initialValue);
```

- `myRef.current` chứa giá trị bạn lưu trữ hoặc element DOM.

#### c. Tính chất

- Khi `myRef.current` thay đổi, component **không** render lại.
- Thích hợp lưu trữ dữ liệu tạm hoặc truy cập/điều khiển DOM.

#### d. Ứng dụng thực tiễn

- Giữ giá trị giữa các lần render.
- Truy xuất DOM node: focus, scroll, đo kích thước...
- Kết hợp với các hook khác để tối ưu hiệu suất.

#### e. Ví dụ

```jsx
import React, { useRef } from 'react';

function DemoRef() {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
}
```

---

### 2.2 Hook `useLayoutEffect`

#### a. Khái niệm

- `useLayoutEffect` chạy **đồng bộ** sau khi React cập nhật DOM, nhưng **trước khi trình duyệt vẽ lại giao diện (paint)**.
- Giúp tránh hiện tượng "giật hình" (layout shift).

#### b. Cú pháp

```jsx
useLayoutEffect(() => {
  // Logic sau khi DOM cập nhật
  return () => {
    // Cleanup (tùy chọn)
  };
}, [deps]);
```

#### c. Tính chất và ứng dụng

- Đảm bảo DOM đã cập nhật trước khi code chạy.
- Phù hợp đo đạc kích thước, vị trí, sửa layout DOM đồng bộ.
- Tránh layout shift, tối ưu trải nghiệm người dùng.

#### d. Ví dụ

```jsx
import React, { useLayoutEffect, useRef, useState } from 'react';

function MeasureDiv() {
  const divRef = useRef(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (divRef.current) {
      setHeight(divRef.current.offsetHeight);
    }
  }, []);

  return (
    <div>
      <div ref={divRef} style={{ padding: 20, border: '1px solid #ccc' }}>
        Đo chiều cao thẻ này
      </div>
      <p>Chiều cao: {height}px</p>
    </div>
  );
}
```

---

## 3. Cú pháp đầy đủ `useState`

```jsx
const [state, setState] = useState(initialValue);
```

- `const`: khai báo biến không đổi tên.
- `[state, setState]`: array destructuring, `state` là giá trị hiện tại, `setState` là hàm cập nhật.
- `initialValue`: giá trị khởi tạo.

Ý nghĩa:

- Lần render đầu giá trị `state` = `initialValue`.
- Gọi `setState(newValue)` cập nhật state và render lại component.

Ví dụ:

```jsx
const [count, setCount] = useState(0);
const [text, setText] = useState('');
```

---

## 4. Nguyên tắc cập nhật state bất đồng bộ

### 4.1 Khái niệm

- `setState` không cập nhật ngay lập tức.
- React gom các cập nhật state trong event và xử lý sau.

### 4.2 Cách hoạt động

```jsx
const [count, setCount] = useState(0);

const handleClick = () => {
  setCount(count + 1);
  console.log(count); // Vẫn là giá trị cũ
};
```

### 4.3 Cách cập nhật đúng khi dựa trên giá trị cũ

```jsx
setCount(prev => prev + 1);
setCount(prev => prev + 1);
```

### 4.4 Lưu ý quan trọng

- Giá trị state chỉ thay đổi trong lần render tiếp theo.
- Không lấy được giá trị mới ngay sau khi gọi `setState`.

---

## 5. Ứng dụng thực tiễn của `useRef`

### a. Giữ giá trị giữa các lần render không làm re-render

- Dùng để lưu các giá trị tạm như bộ đếm render, timer ID, giá trị trước đó.

Ví dụ đếm số lần render:

```jsx
import React, { useRef, useEffect } from 'react';

function RenderCounter() {
  const renderCount = useRef(1);

  useEffect(() => {
    renderCount.current += 1;
  });

  return <p>Số lần render: {renderCount.current}</p>;
}
```

### b. Tham chiếu DOM để thao tác trực tiếp

Ví dụ tự động focus input:

```jsx
import React, { useRef, useEffect } from 'react';

function AutoFocusInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} placeholder="Tự động focus..." />;
}
```

---

## 6. Tổng kết

- `useState`: Hook cơ bản để tạo và quản lý state trong function component, phục vụ các thao tác như nhập liệu, click, hiển thị/ẩn...
- `useRef`, `useLayoutEffect`: Hỗ trợ tối ưu hiệu suất render, thao tác sâu với DOM, xây dựng chức năng nâng cao, cải thiện trải nghiệm người dùng.
