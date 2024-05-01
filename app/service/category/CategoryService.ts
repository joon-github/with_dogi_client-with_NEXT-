import Service from "@/app/service/Service";
import { Category } from "./Category.entity";

class CategoryService extends Service {
  getCategories(type: string) {
    return this.http.get<Category[]>(`/category?type=${type}`);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new CategoryService();
