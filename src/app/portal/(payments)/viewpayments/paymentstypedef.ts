export interface PaymentsListType {
    date: String;
    MID: String;
    subscriber: String;
    mode: "Cash" | "Bank" | "MoMo";
    description: String;
    amount: String;
    status: "Pending" | "Paid";
  }
  
  export const PaymentList: PaymentsListType[] = [
    {
      date: "2024-01-14",
      MID: "MID123",
      subscriber: "Subscriber1",
      mode: "Cash",
      description: "Payment for service",
      amount: "100.00",
      status: "Paid",
    },
    {
      date: "2024-01-15",
      MID: "MID456",
      subscriber: "Subscriber2",
      mode: "Bank",
      description: "Monthly subscription",
      amount: "150.00",
      status: "Pending",
    },
    {
      date: "2024-01-16",
      MID: "MID789",
      subscriber: "Subscriber3",
      mode: "MoMo",
      description: "Payment for product",
      amount: "75.00",
      status: "Paid",
    },
    {
      date: "2024-01-17",
      MID: "MID234",
      subscriber: "Subscriber4",
      mode: "Cash",
      description: "Service renewal",
      amount: "120.00",
      status: "Pending",
    },
    {
      date: "2024-01-18",
      MID: "MID567",
      subscriber: "Subscriber5",
      mode: "Bank",
      description: "Purchase transaction",
      amount: "90.00",
      status: "Paid",
    },
    {
      date: "2024-01-19",
      MID: "MID890",
      subscriber: "Subscriber6",
      mode: "MoMo",
      description: "Subscription fee",
      amount: "200.00",
      status: "Pending",
    },
    {
      date: "2024-01-20",
      MID: "MID345",
      subscriber: "Subscriber7",
      mode: "Cash",
      description: "Payment for service",
      amount: "80.00",
      status: "Paid",
    },
    {
      date: "2024-01-21",
      MID: "MID678",
      subscriber: "Subscriber8",
      mode: "Bank",
      description: "Monthly dues",
      amount: "130.00",
      status: "Pending",
    },
    {
      date: "2024-01-22",
      MID: "MID901",
      subscriber: "Subscriber9",
      mode: "MoMo",
      description: "Product purchase",
      amount: "160.00",
      status: "Paid",
    },
    {
      date: "2024-01-23",
      MID: "MID101",
      subscriber: "Subscriber10",
      mode: "Cash",
      description: "Payment for service",
      amount: "120.00",
      status: "Pending",
    },
  ];
  
