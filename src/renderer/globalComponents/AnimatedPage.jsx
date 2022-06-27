import { motion } from "framer-motion";

const boxAnimation = {
    initial: {
        opacity: 0,
        x: -200,
    },
    animate: {
        x: 0,
        opacity: 1,
    },
    exit: {
        opacity: 0,
        x: 200,
        transition: {
            duration: 0.2,
        },
    },
    transition: {
        duration: 0.2,
        ease: "easeOut",
    },
};
const AnimatedPage = ({ children }) => {
    return <motion.div {...boxAnimation}>{children}</motion.div>;
};

export default AnimatedPage;
