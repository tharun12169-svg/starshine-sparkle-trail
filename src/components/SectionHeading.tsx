import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  gradient?: boolean;
  className?: string;
}

const SectionHeading = ({ title, subtitle, gradient = true, className = "" }: SectionHeadingProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className={`text-center max-w-2xl mx-auto mb-12 ${className}`}
  >
    <h2 className={`text-3xl md:text-4xl font-display font-bold mb-4 ${gradient ? "gradient-text" : ""}`}>{title}</h2>
    {subtitle && <p className="text-muted-foreground text-lg">{subtitle}</p>}
  </motion.div>
);

export default SectionHeading;
