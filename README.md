1. useState là gì?
•	useState là một React Hook được giới thiệu từ React 16.8, cho phép bạn thêm biến trạng thái (state) vào Function Component (trước đây chỉ Class Component mới có state).
•	Khi state thay đổi, component sẽ re-render (vẽ lại giao diện) để cập nhật giá trị mới.
________________________________________1.1 Nguyên lý hoạt động
•	Khi gọi useState(giá_trị_khởi_tạo), React tạo ra một biến lưu trữ giá trị state cho mỗi lần render của component.
•	React giữ một "danh sách state riêng biệt" cho mỗi component, đảm bảo đúng state được dùng ở đúng component.
________________________________________
1.2 Cách khai báo
const [state, setState] = useState(initialValue);
•	state: Biến lưu trữ giá trị hiện tại.
•	setState: Hàm dùng để thay đổi giá trị state. Mỗi lần gọi, component sẽ re-render.
•	initialValue: Giá trị khởi tạo của state (có thể là số, chuỗi, mảng, object...).
Ví dụ:
jsx
const [name, setName] = useState('ChatGPT');
________________________________________
1.3 Cách cập nhật state
a. Cập nhật trực tiếp
setState(newValue);
•	Gán giá trị mới cho state, component sẽ tự động re-render.
b. Cập nhật dựa trên giá trị trước
setState(prevState => newValueBasedOnPrevState);
•	Dùng khi giá trị mới phụ thuộc vào giá trị hiện tại (tránh bug do state bất đồng bộ).
Ví dụ:
setCount(prevCount => prevCount + 1);
•	Đảm bảo luôn đúng khi cập nhật liên tục hoặc cùng lúc nhiều event.
________________________________________
1.4 Tính chất & lưu ý khi dùng useState
a. Bất đồng bộ
•	setState KHÔNG cập nhật ngay lập tức giá trị state.
•	React sẽ lên lịch cập nhật state và re-render component ở vòng render tiếp theo.
b. State chỉ có tác dụng trong phạm vi component
•	Mỗi lần dùng useState, React tạo vùng lưu trữ riêng cho component đó.
•	Các component khác không bị ảnh hưởng.
c. Khai báo nhiều state
•	Bạn có thể khai báo bao nhiêu biến state tùy ý trong một component:
const [name, setName] = useState('');
const [age, setAge] = useState(0);
d. Cập nhật state dạng object/array
•	Khi cập nhật state là object hoặc array, cần sao chép và tạo object/array mới (không chỉnh sửa trực tiếp) để React nhận biết thay đổi.
Ví dụ:
const [user, setUser] = useState({name: '', age: 0});
// Cập nhật name:
setUser(prevUser => ({ ...prevUser, name: 'New Name' }));
________________________________________
1.5 Quy tắc sử dụng useState
•	Chỉ gọi useState ở đầu function component, không gọi trong vòng lặp, điều kiện, hoặc function con.
•	Thứ tự gọi các hook phải luôn giống nhau qua mỗi lần render.

________________________________________
2. Hook useRef
a. Khái niệm
•	useRef là một hook cho phép bạn:
o	Lưu trữ một giá trị bất kỳ qua nhiều lần render mà không bị mất (giống biến instance trong class component).
o	Tham chiếu tới một DOM node để thao tác trực tiếp (focus, scroll, đo kích thước...).
o	Không làm component re-render khi giá trị .current thay đổi.
b. Cú pháp
const myRef = useRef(initialValue);
•	myRef.current chứa giá trị bạn lưu trữ (có thể là bất cứ kiểu dữ liệu nào hoặc là element DOM).
c. Tính chất
•	Khi myRef.current thay đổi, component KHÔNG render lại.
•	Thích hợp để lưu trữ dữ liệu tạm, đếm số lần render, hoặc truy cập/điều khiển element trong DOM.
d. Ứng dụng thực tiễn
•	Giữ giá trị giữa các lần render (ví dụ: lưu giá trị trước đó, đếm số lần click).
•	Truy xuất DOM node: Focus vào ô input, scroll tới phần tử, đo chiều rộng, chiều cao...
•	Kết hợp với các hook khác để tối ưu hiệu suất hoặc logic phức tạp.
e. Ví dụ
import React, { useRef } from 'react';

function DemoRef() {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.focus(); // Truy cập DOM để focus
  };

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
}
________________________________________
2.1 Hook useLayoutEffect
a. Khái niệm
•	useLayoutEffect gần giống useEffect, nhưng có một điểm khác biệt lớn:
o	Chạy đồng bộ sau khi React cập nhật DOM, trước khi trình duyệt vẽ lại giao diện (paint).
o	Nhờ vậy, những thay đổi bạn tạo ra sẽ được thực hiện ngay lập tức, không gây hiện tượng "giật hình" (flash, layout shift).
b. Cú pháp
useLayoutEffect(() => {
  // Code logic chạy sau khi DOM cập nhật
  return () => {
    // Cleanup (tùy chọn)
  };
}, [deps]);
•	Nhận vào một hàm callback và mảng dependency.
c. Tính chất
•	Đảm bảo DOM đã cập nhật xong trước khi code của bạn chạy.
•	Phù hợp với các thao tác đo đạc kích thước, vị trí, hoặc sửa layout DOM đồng bộ.
•	Nếu sử dụng để fetch data, nên dùng useEffect (vì fetch data không liên quan trực tiếp đến layout).
d. Ứng dụng thực tiễn
•	Đo kích thước, vị trí phần tử DOM sau khi render.
•	Cập nhật style hoặc scroll DOM node ngay sau khi render.
•	Tránh layout shift: Dùng khi cần can thiệp layout trước khi trình duyệt hiển thị (giúp trải nghiệm người dùng mượt mà hơn).
e. Ví dụ
import React, { useLayoutEffect, useRef, useState } from 'react';

function MeasureDiv() {
  const divRef = useRef(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (divRef.current) {
      setHeight(divRef.current.offsetHeight); // Đo chiều cao
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
3 .Cú pháp đầy đủ
const [state, setState] = useState(initialValue);
3.1. Các thành phần trong cú pháp:
•	const:
Dùng để khai báo biến bất biến (không gán lại tên biến).
•	[state, setState]:
Array destructuring – cú pháp giải nén mảng trả về từ hàm useState.
o	state: Là biến lưu giá trị hiện tại của state.
o	setState: Là hàm dùng để cập nhật (thay đổi) giá trị của state.
•	useState(initialValue):
o	useState là một hook trong React.
o	initialValue là giá trị khởi tạo (ban đầu) cho biến state (có thể là số, chuỗi, object, array, v.v.).
o	useState trả về một mảng 2 phần tử:
1.	Phần tử 1 là giá trị hiện tại của state.
2.	Phần tử 2 là hàm cập nhật state.
________________________________________
3.2. Ý nghĩa từng phần
•	Khi component được render lần đầu, giá trị của state sẽ bằng initialValue.
•	Mỗi khi gọi hàm setState(newValue), giá trị của state sẽ được cập nhật và component tự động render lại với giá trị mới.
•	Tên biến (state, setState) có thể đặt tùy ý, miễn là phù hợp với logic sử dụng (ví dụ: [count, setCount], [user, setUser]...).
________________________________________
3.3.Ví dụ cụ thể
const [count, setCount] = useState(0);
// count: lưu số lần nhấn nút, khởi tạo bằng 0
// setCount: hàm dùng để tăng/giảm/reset giá trị count

const [text, setText] = useState('');
// text: lưu giá trị nhập vào của input, khởi tạo là chuỗi rỗng
// setText: hàm cập nhật giá trị text khi người dùng nhập
4.Nguyên tắc cập nhật state bất đồng bộ
4.1. Khái niệm
•	Khi bạn gọi hàm cập nhật state (ví dụ: setState hoặc setCount, setText,...), giá trị state không đổi ngay lập tức.
•	React không cập nhật state và re-render component ngay lúc đó. Thay vào đó, React sẽ đưa yêu cầu cập nhật vào một “hàng đợi” (queue) và sẽ xử lý chúng sau khi tất cả các đoạn code đồng bộ hiện tại chạy xong (thường là vào cuối vòng lặp sự kiện – event loop).
________________________________________
4.2. Cách hoạt động
const [count, setCount] = useState(0);

const handleClick = () => {
  setCount(count + 1);
  console.log(count); // Giá trị count ở đây vẫn là giá trị cũ
};
•	Khi bạn click nút và gọi setCount(count + 1), giá trị của count trong đoạn code tiếp theo vẫn chưa đổi.
•	console.log(count) vẫn in ra giá trị cũ, chưa phải giá trị mới.
Lý do:
•	React gom các thay đổi state để tối ưu hiệu suất, tránh re-render component quá nhiều lần trong cùng một thời điểm.
•	Tất cả các cập nhật state trong cùng một event sẽ được gom lại, sau đó mới cập nhật một lần và render lại giao diện.
________________________________________

4.3.Cách cập nhật state dựa trên giá trị cũ
•	Do state cập nhật bất đồng bộ, nếu bạn cập nhật state nhiều lần liên tiếp và giá trị mới phụ thuộc vào giá trị cũ, nên dùng hàm callback thay vì giá trị trực tiếp.
Ví dụ sai (có thể lỗi):
setCount(count + 1);
setCount(count + 1);
// Nếu count = 0, cả hai lần này đều setCount(1)
Ví dụ đúng:
setCount(prev => prev + 1);
setCount(prev => prev + 1);
// Kết quả: count sẽ tăng lên 2 đơn vị
•	Ở đây, mỗi lần setCount, React sẽ lấy giá trị mới nhất vừa cập nhật.
________________________________________
4.4. Một số lưu ý quan trọng
•	Sau khi gọi hàm cập nhật state, giá trị state chỉ thay đổi trong lần render tiếp theo.
•	Không thể lấy giá trị mới của state ngay sau khi gọi setState trong cùng một function.
•	Các cập nhật state trong cùng một event (ví dụ: một lần click) sẽ được gom lại và render sau khi event xử lý xong.
5. Ứng dụng thực tiễn của useRef
a. Giữ giá trị giữa các lần render mà không làm component re-render
•	Vấn đề:
Khi bạn dùng state (useState), mỗi lần cập nhật giá trị sẽ khiến component re-render. Nhưng có những trường hợp bạn chỉ muốn lưu một giá trị tạm thời qua các lần render mà không cần re-render lại component.
•	Giải pháp:
Dùng useRef, vì giá trị nằm trong .current của ref giữ nguyên giữa các lần render nhưng khi thay đổi sẽ không gây re-render.
•	Các tình huống thực tế:
o	Đếm số lần render của component (giám sát hiệu năng).
o	Lưu trữ giá trị trước đó (ví dụ: giá trị input trước khi cập nhật).
o	Lưu trữ timer ID khi dùng với setTimeout/setInterval.
o	Lưu cờ hiệu kiểm soát trạng thái đặc biệt (như cờ “đã gửi yêu cầu chưa”,...).
•	Ví dụ: Đếm số lần render:
import React, { useRef, useEffect } from 'react';

function RenderCounter() {
  const renderCount = useRef(1);

  useEffect(() => {
    renderCount.current += 1;
  });

  return (
    <div>
      <p>Số lần render: {renderCount.current}</p>
    </div>
  );
}
o	Ở đây, mỗi lần component render lại, renderCount.current tăng lên nhưng không làm re-render thêm.
________________________________________
b. Tham chiếu DOM trực tiếp để thao tác với phần tử HTML
•	Tình huống thực tế:
o	Tự động focus vào input khi trang vừa load.
o	Cuộn tới một phần tử cụ thể khi click nút.
o	Đo chiều rộng, chiều cao của một element khi cần.
•	Ví dụ: Focus input khi mở trang:
import React, { useRef, useEffect } from 'react';

function AutoFocusInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} placeholder="Tự động focus..." />;
}
________________________________________
5.1. Ứng dụng thực tiễn của useLayoutEffect
a. Đảm bảo thao tác với DOM hoàn tất trước khi browser “vẽ” lại giao diện
•	Vấn đề:
Với các thao tác đo đạc, chỉnh sửa layout (kích thước, vị trí, scroll,...), nếu dùng useEffect, code có thể chạy sau khi trình duyệt đã hiển thị giao diện, gây “giật hình” (layout shift).
•	Giải pháp:
Dùng useLayoutEffect để code chạy ngay sau khi React cập nhật DOM, trước khi browser vẽ lại màn hình, đảm bảo mọi thay đổi được thực thi đồng bộ và không gây nhấp nháy.
________________________________________
b. Các ứng dụng thực tế:
•	Đo kích thước, vị trí phần tử:
Lấy chiều cao, chiều rộng, vị trí tuyệt đối của phần tử sau khi render để tính toán layout tiếp theo hoặc đặt lại style.
•	Cập nhật scroll:
Kéo thanh cuộn đến đúng vị trí ngay sau khi DOM thay đổi.
•	Điều chỉnh style động:
Thay đổi style CSS dựa trên tính toán kích thước hoặc vị trí, đảm bảo hiển thị chính xác ngay lần đầu.
________________________________________
Ví dụ thực tế: Đo chiều rộng một thẻ div và cập nhật lên giao diện
import React, { useLayoutEffect, useRef, useState } from 'react';

function MeasureDiv() {
  const divRef = useRef(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (divRef.current) {
      setWidth(divRef.current.offsetWidth);
    }
  }, []);

  return (
    <div>
      <div ref={divRef} style={{ width: '50%', border: '1px solid black', padding: '10px' }}>
        Đo chiều rộng thẻ này
      </div>
      <p>Chiều rộng: {width}px</p>
    </div>
  );
}


