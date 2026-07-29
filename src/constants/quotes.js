const QUOTES = [
    {
        quote: "Giáo dục là vũ khí mạnh nhất mà bạn có thể dùng để thay đổi thế giới.",
        author: "Nelson Mandela",
    },
    {
        quote: "Hãy sống như thể bạn sẽ chết vào ngày mai. Hãy học như thể bạn sẽ sống mãi mãi.",
        author: "Mahatma Gandhi",
    },
    {
        quote: "Tương lai thuộc về những người tin vào vẻ đẹp của ước mơ.",
        author: "Eleanor Roosevelt",
    },
    {
        quote: "Thành công là tổng hòa của những nỗ lực nhỏ, được lặp đi lặp lại mỗi ngày.",
        author: "Robert Collier",
    },
    {
        quote: "Nếu bạn không thể bay thì hãy chạy. Nếu không thể chạy thì hãy đi. Nếu không thể đi thì hãy bò, nhưng đừng bao giờ dừng lại.",
        author: "Martin Luther King Jr.",
    },
    {
        quote: "Cách tốt nhất để dự đoán tương lai là tạo ra nó.",
        author: "Peter Drucker",
    },
    {
        quote: "Điều tuyệt vời nhất của việc học là không ai có thể lấy nó khỏi bạn.",
        author: "B. B. King",
    },
    {
        quote: "Đừng xem đồng hồ. Hãy làm như nó: tiếp tục tiến lên.",
        author: "Sam Levenson",
    },
    {
        quote: "Bạn không cần phải giỏi để bắt đầu, nhưng phải bắt đầu để trở nên giỏi.",
        author: "Zig Ziglar",
    },
    {
        quote: "Thành công không phải là chìa khóa của hạnh phúc. Hạnh phúc mới là chìa khóa của thành công.",
        author: "Albert Schweitzer",
    },
    {
        quote: "Không bao giờ là quá muộn để trở thành điều bạn muốn.",
        author: "George Eliot",
    },
    {
        quote: "Điều duy nhất không thể làm được là điều bạn không dám bắt đầu.",
        author: "Khuyết danh",
    },
    {
        quote: "Hãy luôn tò mò. Đó là cách trí tuệ phát triển.",
        author: "Walt Disney",
    },
    {
        quote: "Một hành trình ngàn dặm bắt đầu từ một bước chân.",
        author: "Lão Tử",
    },
    {
        quote: "Kiên trì là thất bại mười chín lần và thành công ở lần thứ hai mươi.",
        author: "Julie Andrews",
    },
    {
        quote: "Đừng sợ đi chậm. Chỉ sợ đứng yên.",
        author: "Tục ngữ Trung Hoa",
    },
    {
        quote: "Học tập không phải để cạnh tranh với người khác, mà để hoàn thiện chính mình.",
        author: "Khuyết danh",
    },
    {
        quote: "Mỗi chuyên gia đều từng là người mới bắt đầu.",
        author: "Helen Hayes",
    },
    {
        quote: "Hôm nay bạn học điều gì sẽ quyết định ngày mai bạn trở thành ai.",
        author: "Khuyết danh",
    },
    {
        quote: "Ước mơ lớn bắt đầu từ những việc nhỏ được làm mỗi ngày.",
        author: "Khuyết danh",
    },
    {
        quote: "Không có bí quyết nào cho thành công. Đó là kết quả của sự chuẩn bị, chăm chỉ và học hỏi từ thất bại.",
        author: "Colin Powell",
    },
    {
        quote: "Đọc sách là cách rẻ nhất để đi khắp thế giới.",
        author: "Khuyết danh",
    },
    {
        quote: "Sự khác biệt giữa bình thường và phi thường nằm ở chữ 'cố gắng'.",
        author: "Jimmy Johnson",
    },
    {
        quote: "Hãy luôn làm tốt nhất những gì bạn có thể. Điều tốt nhất sẽ đến sau đó.",
        author: "Og Mandino",
    },
    {
        quote: "Người không đọc sách chẳng hơn gì người không biết đọc.",
        author: "Mark Twain",
    },
    {
        quote: "Đừng từ bỏ điều bạn thực sự muốn chỉ vì nó khó.",
        author: "Khuyết danh",
    },
    {
        quote: "Hãy biến mỗi ngày thành một cơ hội để học điều mới.",
        author: "Khuyết danh",
    },
    {
        quote: "Thất bại chỉ là cơ hội để bắt đầu lại một cách thông minh hơn.",
        author: "Henry Ford",
    },
    {
        quote: "Bạn mạnh mẽ hơn bạn nghĩ và thông minh hơn bạn tưởng.",
        author: "A. A. Milne",
    },
    {
        quote: "Điều duy nhất giới hạn thành công của ngày mai là những nghi ngờ của hôm nay.",
        author: "Franklin D. Roosevelt",
    },
    {
        quote: "Hãy giữ khuôn mặt hướng về ánh mặt trời, bóng tối sẽ ở phía sau bạn.",
        author: "Walt Whitman",
    },
    {
        quote: "Thời gian tốt nhất để trồng cây là 20 năm trước. Thời gian tốt thứ hai là ngay bây giờ.",
        author: "Tục ngữ Trung Hoa",
    },
    {
        quote: "Không ai có thể quay lại và bắt đầu một khởi đầu mới, nhưng ai cũng có thể bắt đầu hôm nay để tạo nên một kết thúc mới.",
        author: "Carl Bard",
    },
    {
        quote: "Hãy học từ ngày hôm qua, sống cho hôm nay và hy vọng vào ngày mai.",
        author: "Albert Einstein",
    },
    {
        quote: "Trí tưởng tượng quan trọng hơn kiến thức.",
        author: "Albert Einstein",
    },
    {
        quote: "Cơ hội không tự đến. Bạn phải tạo ra nó.",
        author: "Chris Grosser",
    },
    {
        quote: "Không có con đường tắt đến bất kỳ nơi nào đáng để đến.",
        author: "Beverly Sills",
    },
    {
        quote: "Đừng đếm số ngày. Hãy khiến mỗi ngày đều có ý nghĩa.",
        author: "Muhammad Ali",
    },
    {
        quote: "Làm điều bạn có thể, với những gì bạn có, ở nơi bạn đang đứng.",
        author: "Theodore Roosevelt",
    },
    {
        quote: "Thành công là quá trình, không phải điểm đến.",
        author: "Arthur Ashe",
    },
];

export default QUOTES;