class CrudRepository {
  model: any;

  constructor(model: any) {
    this.model = model;
  }

  async create(data: any) {
    return await this.model.create({ data });
  }

  async findById(id: string) {
    return await this.model.findUnique({
      where: { id },
    });
  }

  async findAll() {
    return await this.model.findMany();
  }

  async update(id: string, data: any) {
    return await this.model.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return await this.model.delete({
      where: { id },
    });
  }
}

export default CrudRepository;
