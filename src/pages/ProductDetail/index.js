import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchProduct } from "../../api";
import styles from "./styles.module.css";

function ProductDetail() {
  const { product_id } = useParams();

  const { isLoading, isError, data } = useQuery(["product", product_id], () =>
    fetchProduct(product_id)
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error.</div>;
  }
  console.log(data);
  const formattedDate = new Date(data.createdAt).toLocaleDateString();

  return (
    <div className={styles.productDetail}>
      <div className={styles.productImage}>
        <img src={data.photos} alt={data.title} />
      </div>
      <div className={styles.productInfo}>
        <h1 className={styles.productTitle}>{data.title}</h1>
        <p className={styles.productDescription}>{data.description}</p>
        <div className={styles.productPrice}>
          <span className={styles.price}>${data.price}</span>
        </div>
        <div className={styles.productDate}>
          <p>
            <strong>Release Date:</strong> {formattedDate}
          </p>
        </div>
        <button className={styles.buyNowBtn}>Buy Now</button>
      </div>
    </div>
  );
}

export default ProductDetail;
