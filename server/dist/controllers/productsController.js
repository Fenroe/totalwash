"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsController = void 0;
const models_1 = require("../models");
const express_validator_1 = require("express-validator");
const utilities_1 = require("../utilities");
const getProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const product = yield models_1.Product.findOne({ slug: productId }).exec();
        return res.status(200).send({ product });
    }
    catch (err) {
        return next(err);
    }
});
const getAllProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { range, sale, featured, minprice, maxprice } = req.query;
        const textToSearch = req.query.q;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 0;
        const offset = (page - 1) * limit;
        const query = {};
        if (range) {
            query.ranges = range;
        }
        if (sale === "true") {
            query.isOnSale = true;
        }
        if (featured === "true") {
            query.isFeatured = true;
        }
        if (minprice || maxprice) {
            query.currentPrice = {
                $lte: parseInt(maxprice) || 1000000000,
                $gte: parseInt(minprice) || 0,
            };
        }
        const getSortMethod = (query) => {
            switch (query.sortby) {
                case "name":
                    return { name: 1 };
                case "high-low":
                    return { currentPrice: -1 };
                case "low-high":
                    return { currentPrice: 1 };
                case "relevance":
                    return { score: { $meta: "textScore" } };
                default:
                    if (textToSearch) {
                        return { score: { $meta: "textScore" } };
                    }
                    else {
                        return { name: 1 };
                    }
            }
        };
        const sortby = getSortMethod(req.query);
        if (textToSearch) {
            const total = yield models_1.Product.countDocuments({ $text: { $search: decodeURI(textToSearch) } }, { score: { $meta: "textScore" } });
            const products = yield models_1.Product.find({ $text: { $search: decodeURI(textToSearch) } }, { score: { $meta: "textScore" } })
                .sort({ score: { $meta: "textScore" } })
                .skip(offset)
                .limit(limit)
                .populate("ranges")
                .exec();
            return res.status(200).send({ products, total });
        }
        else {
            const total = yield models_1.Product.countDocuments(query);
            const products = yield models_1.Product.find(query)
                .sort(sortby)
                .skip(offset)
                .limit(limit)
                .populate("ranges")
                .exec();
            return res.status(200).send({ products, total });
        }
    }
    catch (err) {
        return next(err);
    }
});
const postProduct = [
    (0, express_validator_1.body)("name").isString().notEmpty().trim(),
    (0, express_validator_1.body)("ranges")
        .isArray()
        .custom((value) => (0, utilities_1.validateArrayOfObjectIds)(value)),
    (0, express_validator_1.body)("fullPrice").isNumeric(),
    (0, express_validator_1.body)("currentPrice").isNumeric(),
    (0, express_validator_1.body)("description").isArray(),
    (0, express_validator_1.body)("features").isArray(),
    (0, express_validator_1.body)("whatsIncluded").isArray(),
    (0, express_validator_1.body)("isFeatured").isBoolean(),
    (0, express_validator_1.body)("isOnSale").isBoolean(),
    (0, express_validator_1.body)("photos").isArray(),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                throw new Error("Validation error");
            }
            const { name, ranges, fullPrice, currentPrice, description, features, whatsIncluded, isFeatured, isOnSale, photos, } = req.body;
            ranges.forEach((range) => __awaiter(void 0, void 0, void 0, function* () {
                const rangeInDatabase = yield models_1.Category.findById(range);
                if (!rangeInDatabase) {
                    throw new Error("Specified range was not in database");
                }
            }));
            const product = new models_1.Product({
                name,
                ranges,
                fullPrice,
                currentPrice,
                description,
                features,
                whatsIncluded,
                isFeatured,
                isOnSale,
                photos,
            });
            const savedProduct = yield product.save();
            return res.status(201).send({ product: savedProduct });
        }
        catch (err) {
            return next(err);
        }
    }),
];
const updateProduct = [
    (0, express_validator_1.body)("name").isString().notEmpty().trim(),
    (0, express_validator_1.body)("ranges")
        .isArray()
        .custom((value) => (0, utilities_1.validateArrayOfObjectIds)(value)),
    (0, express_validator_1.body)("fullPrice").isNumeric(),
    (0, express_validator_1.body)("currentPrice").isNumeric(),
    (0, express_validator_1.body)("description").isArray(),
    (0, express_validator_1.body)("features").isArray(),
    (0, express_validator_1.body)("whatsIncluded").isArray(),
    (0, express_validator_1.body)("isFeatured").isBoolean(),
    (0, express_validator_1.body)("isOnSale").isBoolean(),
    (0, express_validator_1.body)("photos").isArray(),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                throw new Error("Validation error");
            }
            const { name, ranges, fullPrice, currentPrice, description, features, whatsIncluded, isFeatured, isOnSale, photos, } = req.body;
            ranges.forEach((range) => __awaiter(void 0, void 0, void 0, function* () {
                const rangeInDatabase = yield models_1.Range.findById(range);
                if (!rangeInDatabase) {
                    throw new Error("Specified range was not in database");
                }
            }));
            const { productId } = req.params;
            yield models_1.Product.findOneAndUpdate({
                slug: productId,
            }, {
                name,
                ranges,
                fullPrice,
                currentPrice,
                description,
                features,
                whatsIncluded,
                isFeatured,
                isOnSale,
                photos,
            }).exec();
            return res.status(200).send({ message: "Product was updated" });
        }
        catch (err) {
            return next(err);
        }
    }),
];
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        yield models_1.Product.findOneAndDelete({ slug: productId });
        return res.status(200).send({ message: "Product was deleted" });
    }
    catch (err) {
        return next(err);
    }
});
exports.productsController = {
    getProduct,
    getAllProducts,
    postProduct,
    updateProduct,
    deleteProduct,
};
