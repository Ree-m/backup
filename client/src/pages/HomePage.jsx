import { useState, useEffect } from "react"
import Product from "../Product"
import MyCarousel from "../Carousel";
import UncontrolledCarousel from "../UncontrolledCarousel";
import NewProducts from "../NewProducts";
import Brands from "../Brands";

const HomePage = ({ products, setProducts }) => {
    const [carouselItems, setCarouselItems] = useState([])

    useEffect(() => {
        fetch("http://localhost:9000/allCarouselProducts")
            .then(res => res.json())
            .then(products =>
                setCarouselItems(products)
            )

    }, [])


    return (
        <div className="home-page">
            <UncontrolledCarousel />
            <div className="padded">
                <MyCarousel carouselItems={carouselItems} setCarouselItems={setCarouselItems} />
                <NewProducts />
            
                <Brands />
            </div>


        </div >


    );
}

export default HomePage;