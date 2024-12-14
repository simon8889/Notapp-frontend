import { IoIosClose } from "react-icons/io";
import { useMemo } from "react";
import { deleteCategory } from "@/api/notes";
import useAuth from "@/hook/useAuth";
import { redirect } from "next/navigation";
import './Category.css';

const getRandomPastelColor = () => {
  const letters = '89ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 6)];
  }
  return color;
};

const Category = ({ category, refresh }: { category: Category, refresh: () => void}) => {
  const randomPastelColor = useMemo(() => getRandomPastelColor(), []);
  const { token } = useAuth()
  
  const handleDelete = async () => {
    if (!token) {
      redirect("/login")
    }
    const result = await deleteCategory(token, category.id);
    if (!result.ok) return;
    const data = await result.json() as ApiDeletedResponse;
    if (data.deleted) {
      refresh();
    }
  }
  
  return (
    <div className="Category__container" style={{ backgroundColor: randomPastelColor }}>
      <span className="Category__name">{category.name}</span>
      <div className="Category__icons">
        <IoIosClose onClick={ handleDelete }/>
      </div>
    </div>
  );
};

export default Category;
