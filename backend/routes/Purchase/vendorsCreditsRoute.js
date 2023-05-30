const express = require('express');
const vendorsCreditModel = require('../../models/Purchase/vendorsCredit');
const billPaymentModel = require('../../models/Purchase/billPaymentsModel');
const purchaseOrderModel = require('../../models/Purchase/purchaseOrdersModel');
const router = express.Router();


router.put('/vendorcredits', async (req, res) => {
    try {
        const data = await vendorsCreditModel.create(req.body);
        const bills = await billPaymentModel.findOneAndUpdate(
            { purchaseId: req.body.purchaseId }, // Update the query to find the document based on the purchaseId
            { $set: { status: req.body.status } },
            { new: true } // Set the 'new' option to true to return the updated document
        );
        if (!bills) {
            throw new Error('Bill payment document not found');
        }

        const purchase = await purchaseOrderModel.findOneAndUpdate(
            { purchase_order_id: req.body.purchaseId }, // Update the query to find the document based on the purchaseId
            { $set: { status: req.body.status } },
            { new: true } // Set the 'new' option to true to return the updated document
        );
        if (!purchase) {
            throw new Error('Purchase order document not found');
        }

        res.send({ success: data, bills, purchase });
    } catch (error) {
        // Handle the error appropriately
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/vendorcredits', async (req, res) => {
    const data = await vendorsCreditModel.find({});
    res.send({ success: data });
});

module.exports = router;