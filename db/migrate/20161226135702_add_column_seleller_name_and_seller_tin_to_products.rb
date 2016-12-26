class AddColumnSelellerNameAndSellerTinToProducts < ActiveRecord::Migration
  def change
    add_column :products, :seller_name, :string
    add_column :products, :tin_number, :string
  end
end
