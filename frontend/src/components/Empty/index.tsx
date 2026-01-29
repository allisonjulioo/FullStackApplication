import { AnimatePresence, motion } from 'framer-motion';
import { ContentEmpty } from './styles';

interface EmptyProps {
  text?: string;
}

export const Empty = ({ text }: EmptyProps) => {
  return (
    <AnimatePresence>
      <ContentEmpty>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{ fontSize: '64px' }}
        >
          📦
        </motion.div>

        <motion.section
          initial={{ y: 4, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <h4>Nenhum produto encontrado</h4>
          <span>{text ?? 'Tente ajustar os filtros ou cadastre um novo produto.'}</span>
        </motion.section>
      </ContentEmpty>
    </AnimatePresence>
  );
};
