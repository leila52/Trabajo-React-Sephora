import React from "react";
import "../estilos/Inicio.css";
import { Link } from 'react-router-dom';
//npm insall react-icons
import { FaInstagram, FaTiktok, FaYoutube, FaFacebook } from "react-icons/fa";


const Inicio = ({ }) => {



    return (
        <>
            <div className="promo-container">
                <img className="promo-image" src="https://www.sephora.es/on/demandware.static/-/Sites-siteCatalog_Sephora_ES/es_ES/dw34c6b58a/2025/PLP_BANNER/W05/PLPBANNER_PROMO_IMPOSSIBLELOVE_W8.jpg" alt="Promo Sephora" />
                <div className="promo-text">
                    <h1>-20%* en top ventas 💔</h1>
                    <span>*Oferta válida del 18 al 19 de febrero de 2025, ambos inclusive, en Sephora.es y en la APP de Sephora. No válido para comprar tarjeta regalo, ni servicios. No acumulable con otras ofertas, descuentos, y/o promociones.</span>
                </div>
            </div>
            <div className="container">
                <div className="item">
                    <img src="https://www.sephora.es/on/demandware.static/-/Library-Sites-SephoraV2/es_ES/dw09019b87/HOMEPAGE/W8/UNDERBANNER_READYSETGO.jpg" alt="" />
                    <h2>Prime, set, go!</h2>
                    <h3>Prebases cremosas, polvos, brumas: fija el maquillaje a tu manera.</h3>
                    <div className="botonnn"><Link to="/maquillaje" >Maquillaje</Link></div>
                    <p>*Excepto en tiendas de la marca.</p>


                </div>
                <div className="item">
                    <img src="https://www.sephora.es/on/demandware.static/-/Library-Sites-SephoraV2/es_ES/dw8f626c66/HOMEPAGE/W8/UNDERBANNER_ERBORIANSKINTHERPY.jpg" alt="" />
                    <h2>Novedad Erborian</h2>
                    <h3>Tratamiento coreano con resultados visibles desde la 1ª noche*.</h3>
                    <div className="botonnn"><Link to="/skinCare">Skin Care</Link></div>
                    <p>Resultados comprobados mediante pruebas de eficacia y/o pruebas de consumidores en 33 voluntarios</p>
                </div>

            </div>
            <section className="novedades">
                <h1>Todas las novedades</h1>
                <p>¡Enamórate de nuestras últimas novedades y top ventas de tus marcas favoritas!</p>
                <div className="productos">
                    <div className="producto">
                        <img
                            src="https://www.sephora.es/dw/image/v2/BCVW_PRD/on/demandware.static/-/Library-Sites-SephoraV2/es_ES/dwd393aa75/HOMEPAGE/W8/BRANDORAMA_FENTYBEAUTYBLUSHBOMB.jpg?q=75"
                            alt="Fenty Beauty"
                        />
                        <h2>Fenty Beauty</h2>
                    </div>
                    <div className="producto">
                        <img
                            src="https://www.sephora.es/dw/image/v2/BCVW_PRD/on/demandware.static/-/Library-Sites-SephoraV2/es_ES/dw5a7968e2/HOMEPAGE/W8/BRANDORAMA_MISSDIOR.jpg?q=75"
                            alt="Dior"
                        />
                        <h2>Dior</h2>
                    </div>
                    <div className="producto">
                        <img
                            src="https://www.sephora.es/dw/image/v2/BCVW_PRD/on/demandware.static/-/Library-Sites-SephoraV2/es_ES/dwf9128889/HOMEPAGE/W8/BRANDORAMA_MUGLERALIEN.jpg?q=75"
                            alt="Mugler"
                        />
                        <h2>Mugler</h2>
                    </div>
                    <div className="producto">
                        <img
                            src="https://www.sephora.es/dw/image/v2/BCVW_PRD/on/demandware.static/-/Library-Sites-SephoraV2/es_ES/dw58123258/HOMEPAGE/W8/BRANDORAMA_GIOUMASK.jpg?q=75"
                            alt="Gisou"
                        />
                        <h2>Gisou</h2>
                    </div>
                </div>
            </section>
            <section className="informacion">
                <div className="info">Sephora te abre las puertas de su magnífico universo, lleno de ideas de regalo y productos de belleza imprescindibles. Encuentra las últimas novedades y bestsellers de maquillaje: bases, labiales o máscaras de pestañas. Remata tu look con un toque de perfume. Eau de parfum o eau de toilette, elige tu</div>
                <div className="info">fragancia de mujer favorita y mima a tu chico con un exclusivo perfume para hombre. Después de un largo día, te mereces un descanso. ¡Cuida tu rostro, cuerpo y cabello! Mantén una rutina de belleza perfecta con nuestras marcas expertas y sus innovadores tratamientos para conseguir una piel radiante.</div>
                <div className="info">Consigue el cabello de tus sueños con cuidados reparadores, adecuados para todas tus necesidades. ¿Buscas el regalo perfecto? Inspírate con nuestra Beauty Board y su comunidad para encontrar el detalle ideal.</div>

            </section>
            <footer className="footer">
                <div className="footer-container">
                    <p className="footer-text">Síguenos en nuestras redes sociales</p>
                    <div className="social-icons">
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="icon instagram" />
                        </a>
                        <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
                            <FaTiktok className="icon tiktok" />
                        </a>
                        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                            <FaYoutube className="icon youtube" />
                        </a>
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebook className="icon facebook" />
                        </a>
                    </div>
                </div>
                <p className="footer-credits">© 2025 Beauty Lovers | La mejor pagina para comprar maquillaje</p>
            </footer>

        </>

    );
}
export default Inicio;
