import "./App.css";
import PaymentBox from "./paymentBox";

function App() {
  return (
    <div>
      <PaymentBox
        imagesUrl="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
        senderCardNumber="1234-5678-9012-3456"
        receiverCardNumber="1234-5678-9012-3456"
        trackingCode="1234567890"
        paidDate="2024-01-01"
        paymentMethod="Credit Card"
        issuerFullName="Bank of America"
        paidPrice={100}
        status="rejected"
        description="This is a test description"
      />
    </div>
  );
}

export default App;
