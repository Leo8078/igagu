import { useState } from "react";
import { Link } from "react-router-dom"; // Link 컴포넌트 import

const allProducts = [
    { id: 1, title: "와이드 턱 팬츠 스프링 믹스", price: "92,000원", img: "/imgs/shop/pants1-1.jpg", category: "BOTTOM"},
    { id: 2, title: "[무료배송] 오름 클라이밍 스타터 키트 (파인초크)", price: "45,000원", img: "/imgs/shop/bag1-1.jpg", category: "ACC"},
    { id: 3, title: "[무료배송] 오름 클라이밍 스타터 키트 (크러쉬드)", price: "45,000원", img: "/imgs/shop/bag1-2.jpg", category: "ACC"},
    { id: 4, title: "오름 리필러블 초크볼 (65g)", price: "6,000원", img: "/imgs/shop/chalk1-1.jpg", category: "ACC"},
    { id: 5, title: "상품5", price: "50,000원", img: "/imgs/shop/bag1-3.jpg", category: "CHALK BAGS" },
    { id: 6, title: "상품6", price: "60,000원", img: "/imgs/shop/bag1-4.jpg", category: "CHALK BAGS" },
    { id: 7, title: "상품7", price: "70,000원", img: "/imgs/shop/bag1-5.jpg", category: "CHALK BAGS" },
    { id: 8, title: "상품8", price: "80,000원", img: "/imgs/shop/bag1-6.jpg", category: "CHALK BAGS" },
    { id: 9, title: "상품9", price: "50,000원", img: "/imgs/shop/bag1-7.jpg", category: "CHALK BAGS" },
    { id: 10, title: "상품10", price: "60,000원", img: "/imgs/shop/bag1-8.jpg", category: "CHALK BAGS" },
    { id: 11, title: "상품11", price: "70,000원", img: "/imgs/shop/cap1-1.jpg", category: "ACC" },
    { id: 12, title: "상품12", price: "80,000원", img: "/imgs/shop/cap1-2.jpg", category: "ACC" },
    { id: 13, title: "상품13", price: "60,000원", img: "/imgs/shop/cap1-3.jpg", category: "ACC" },
    { id: 14, title: "상품14", price: "70,000원", img: "/imgs/shop/hoodie1-1.jpg", category: "TOP" },
    { id: 15, title: "상품15", price: "80,000원", img: "/imgs/shop/hoodie1-2.jpg", category: "TOP" },
    { id: 16, title: "상품16", price: "60,000원", img: "/imgs/shop/pants1-2.jpg",category: "BOTTOM" },
    { id: 17, title: "상품17", price: "70,000원", img: "/imgs/shop/pants1-3.jpg", category: "BOTTOM" },
    { id: 18, title: "상품18", price: "80,000원", img: "/imgs/shop/pants1-4.jpg", category: "BOTTOM" },
    { id: 19, title: "상품19", price: "60,000원", img: "/imgs/shop/oil.jpg", category: "SKIN CARE" },
    { id: 20, title: "상품20", price: "70,000원", img: "/imgs/shop/ring.jpg", category: "SKIN CARE" },
    { id: 21, title: "상품21", price: "80,000원", img: "/imgs/shop/paper1-1.jpg", category: "SKIN CARE" },
    { id: 22, title: "상품22", price: "60,000원", img: "/imgs/shop/paper1-2.jpg", category: "SKIN CARE" },
    { id: 23, title: "상품23", price: "70,000원", img: "/imgs/shop/t1-1.jpg", category: "TOP" },
    { id: 24, title: "상품24", price: "80,000원", img: "/imgs/shop/t1-2.jpg", category: "TOP" },
    { id: 25, title: "상품25", price: "80,000원", img: "/imgs/shop/t1-3.jpg", category: "TOP" },
    { id: 26, title: "상품24", price: "80,000원", img: "/imgs/shop/bag2-1.jpg", category: "ACC" },
    { id: 27, title: "상품25", price: "80,000원", img: "/imgs/shop/bag2-2.jpg", category: "ACC" }
];

const Shop = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [activeMenu, setActiveMenu] = useState("ALL");
    const [setHoveredProduct] = useState(null);
    const productsPerPage = 16;

    // 카테고리에 맞는 상품 필터링
    const filteredProducts = activeMenu === "ALL" ? allProducts : allProducts.filter(product => product.category === activeMenu);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    return (
        <div className="container">
            <div className="shop-container">
                <ul className="shop-menu">
                    {["ALL", "BOTTOM", "TOP", "CHALK BAGS", "ACC", "SKIN CARE"].map((menu) => (
                        <li key={menu} className={activeMenu === menu ? "active" : ""} onClick={() => setActiveMenu(menu)}>
                            <a href="#">{menu}</a>
                        </li>
                    ))}
                </ul>

                <section className="product-list">
                    {currentProducts.map((product) => (
                        <div className="product-item"
                             key={product.id}
                             onMouseEnter={() => setHoveredProduct(product.id)}
                             onMouseLeave={() => setHoveredProduct(null)}>
                            <Link to={`/product/${product.id}`} className="product-link">
                                <img src={product.img} alt={product.title} />
                            </Link>
                            <p>{product.title}</p>
                            {product.sale ? (
                                <div className="price">
                                    <span className="sale-price">{product.price}</span>
                                </div>
                            ) : (
                                <strong>{product.price}</strong>
                            )}
                            <button className="wish-btn">WISH</button>
                            <button className="add-btn">ADD</button>
                        </div>
                    ))}
                </section>

                <div className="pagination">
                    <button className="page-btn" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>«</button>
                    {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((num) => (
                        <button key={num} className={`page-btn ${currentPage === num ? 'active' : ''}`} onClick={() => setCurrentPage(num)}>
                            {num}
                        </button>
                    ))}
                    <button className="page-btn" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>»</button>
                </div>
            </div>
        </div>
    );
};

export default Shop;