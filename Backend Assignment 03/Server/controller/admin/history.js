const Order = require("../../model/order");

exports.getAllHistory = (req, res, next) => {
  Order.find()
    .then((history) => {
      const transactionHistory = history.map((order) => {
        const totalPrice = order._doc.cart.reduce((pre, after) => {
          return (
            pre.priceProduct * Number(pre.count) +
            after.priceProduct * Number(after.count)
          );
        });
        return {
          ...order._doc,
          total: totalPrice,
        };
      });
      return res.json({
        data: {
          transaction: transactionHistory,
          totalLength: transactionHistory.length,
        },
        meta: {
          message: "Nhận dữ liệu lịch sử giao dịch thành công",
          statusCode: 1,
        },
      });
    })
    .catch((err) => {
      return res.json({
        meta: {
          message: "Nhận dữ liệu không thành công",
          statusCode: 0,
        },
      });
    });
};
