import {
  Box,
  Card,
  CardContent,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

interface PaymentCardProps {
  imagesUrl: string;
  senderCardNumber: string;
  receiverCardNumber: string;
  description?: string;
  trackingCode: string;
  paidDate: string;
  paymentMethod: string;
  issuerFullName: string;
  paidPrice: number;
  status: string;
}

const StatusBox = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.common.white,
  padding: theme.spacing(1),
  textAlign: "center",
  marginTop: theme.spacing(2),
}));

const PaymentCard: React.FC<PaymentCardProps> = ({
  imagesUrl,
  senderCardNumber,
  receiverCardNumber,
  description,
  trackingCode,
  paidDate,
  paymentMethod,
  issuerFullName,
  paidPrice,
  status,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "successful":
        return "success.main";
      case "pending":
        return "warning.main";
      case "rejected":
        return "error.main";
      default:
        return "text.primary";
    }
  };

  return (
    <Card sx={{ maxWidth: 400, margin: "auto", padding: 2 }}>
      <CardContent>
        {/* Image */}
        <Box
          sx={{
            width: "100%",
            height: 150,
            backgroundImage: `url(${imagesUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            border: "1px solid #ccc",
            marginBottom: 2,
          }}
        />

        {/* Description for rejected status */}
        {status === "rejected" && description && (
          <TextField
            label="توضیحات"
            value={description}
            multiline
            rows={3}
            fullWidth
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
        )}

        {/* Card Numbers */}
        <TextField
          label="از شماره کارت"
          value={senderCardNumber}
          fullWidth
          variant="outlined"
          InputProps={{ readOnly: true }}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="به شماره کارت"
          value={receiverCardNumber}
          fullWidth
          variant="outlined"
          InputProps={{ readOnly: true }}
          sx={{ marginBottom: 2 }}
        />

        {/* Tracking Code */}
        <Typography
          variant="body2"
          sx={{ fontWeight: "bold", marginBottom: 1 }}
        >
          کد رهگیری:
          <Typography
            component="span"
            sx={{ fontWeight: "normal", marginRight: 1 }}
          >
            {trackingCode}
          </Typography>
        </Typography>
        <Divider sx={{ opacity: 0.5, marginBottom: 2 }} />

        {/* Paid Date */}
        <Typography
          variant="body2"
          sx={{ fontWeight: "bold", marginBottom: 1 }}
        >
          زمان واریز:
          <Typography
            component="span"
            sx={{ fontWeight: "normal", marginRight: 1 }}
          >
            {paidDate}
          </Typography>
        </Typography>
        <Divider sx={{ opacity: 0.5, marginBottom: 2 }} />

        {/* Payment Method */}
        <Typography
          variant="body2"
          sx={{ fontWeight: "bold", marginBottom: 1 }}
        >
          روش پرداخت:
          <Typography
            component="span"
            sx={{ fontWeight: "normal", marginRight: 1 }}
          >
            {paymentMethod}
          </Typography>
        </Typography>

        {/* Issuer Full Name */}
        <Typography
          variant="body2"
          sx={{ fontWeight: "bold", marginBottom: 1 }}
        >
          کارشناس ثبت کننده:
          <Typography
            component="span"
            sx={{ fontWeight: "normal", marginRight: 1 }}
          >
            {issuerFullName}
          </Typography>
        </Typography>

        {/* Paid Price */}
        <Typography
          variant="body2"
          sx={{
            fontWeight: "bold",
            marginTop: 2,
            color: getStatusColor(status),
          }}
        >
          مبلغ پرداخت شده: {paidPrice.toLocaleString()} تومان
        </Typography>

        {/* Status */}
        <StatusBox sx={{ backgroundColor: getStatusColor(status) }}>
          {status === "successful"
            ? "تایید شده"
            : status === "pending"
            ? "در انتظار"
            : "رد شده"}
        </StatusBox>
      </CardContent>
    </Card>
  );
};

export default PaymentCard;
