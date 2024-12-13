import {
  Box,
  Card,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { alpha, styled, Theme } from "@mui/material/styles";
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
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 5,
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

  const getPaidPriceTextColor = (status: string) => {
    switch (status) {
      case "successful":
        return (theme: Theme) => alpha(theme.palette.success.light, 0.2);
      case "pending":
        return (theme: Theme) => alpha(theme.palette.warning.light, 0.2);
      case "rejected":
        return (theme: Theme) => alpha(theme.palette.error.light, 0.2);
      default:
        return (theme: Theme) => alpha(theme.palette.text.primary, 0.2);
    }
  };

  return (
    <Card
      sx={{
        p: 2,
        borderRadius: 1,
      }}
    >
      {/* Image */}
      <Box // TODO: change with next Image component
        sx={{
          height: 300,
          backgroundImage: `url(${imagesUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          border: "1px solid #ccc",
          borderRadius: "6px",
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
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        {/* Tracking Code */}
        <Typography
          sx={{
            color: (theme) => theme.palette.text.secondary,
            fontSize: "14px",
          }}
        >
          کد رهگیری:
        </Typography>
        <Typography>{trackingCode}</Typography>
      </Stack>
      <Divider sx={{ opacity: 0.5, marginBottom: 2 }} />

      {/* Paid Date */}
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography
          sx={{
            color: (theme) => theme.palette.text.secondary,
            fontSize: "14px",
          }}
        >
          زمان واریز:
        </Typography>
        <Typography>{paidDate}</Typography>
      </Stack>
      <Divider sx={{ opacity: 0.5, marginBottom: 2 }} />

      {/* Payment Method */}
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography
          sx={{
            color: (theme) => theme.palette.text.secondary,
            fontSize: "14px",
          }}
        >
          روش پرداخت:
        </Typography>
        <Typography>{paymentMethod}</Typography>
      </Stack>
      <Divider sx={{ opacity: 0.5, marginBottom: 2 }} />
      {/* Issuer Full Name */}
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography
          sx={{
            color: (theme) => theme.palette.text.secondary,
            fontSize: "14px",
          }}
        >
          کارشناس ثبت کننده:
        </Typography>
        <Typography>{issuerFullName}</Typography>
      </Stack>
      <Divider sx={{ opacity: 0.5, marginBottom: 2 }} />
      {/* Paid Price */}
      <Typography
        variant="body2"
        sx={{
          fontWeight: "bold",
          marginTop: 2,
          color: getStatusColor(status),
          backgroundColor: getPaidPriceTextColor(status),
          borderRadius: 1,
          padding: 1,
          textAlign: "center",
        }}
      >
        مبلغ پرداخت شده : {paidPrice.toLocaleString()} تومان
      </Typography>

      {/* Status */}
      <StatusBox sx={{ backgroundColor: getStatusColor(status) }}>
        <Typography>وضعیت : </Typography>
        <Typography>
          {status === "successful"
            ? "تایید شده"
            : status === "pending"
            ? "در انتظار"
            : "رد شده"}
        </Typography>
      </StatusBox>
    </Card>
  );
};

export default PaymentCard;
