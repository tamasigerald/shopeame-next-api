import Product from '../models/product';

export async function getProducts(req, res) {
    try {
        const result = await Product.find({});
        res.status(200).json({ success: true, result: result });
    } catch (error) {
        res.status(400).json({ success: false });
    }
}

export async function getProduct(req, res, id) {
    try {
        const result = await Product.find({id: id});
        res.status(200).json({ success: true, result: result });
    } catch (error) {
        res.status(400).json({ success: false });
    }
}

export async function postProduct(req, res) {
    const item = req.body;
    try {
        const newItem = await Product.create(item);
        res.status(201).json({ success: true, result: newItem });
    } catch (error) {
        res.status(400).json({ success: false, error: error });
        console.log(error);
    }
}

export async function updateProduct(req, res, id) {
    try {
        const item = req.body;
        const updatedItem = await Product.findOneAndUpdate({id: id}, item);
        if (!updatedItem) {
            return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, result: item })
    } catch (error) {
        res.status(400).json({ success: false });
    }
}

export async function deleteProduct(req, res, id) {
    try {
        const result = await Product.deleteOne({id: id});
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(400).json({ success: false });

    }
}