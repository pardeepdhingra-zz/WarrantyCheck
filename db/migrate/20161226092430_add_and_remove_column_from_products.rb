class AddAndRemoveColumnFromProducts < ActiveRecord::Migration
  def change
    remove_column :products, :product_type, :string
    remove_column :products, :item_id, :integer
    remove_column :products, :date_of_purchase, :date

    add_column :products, :barcode, :string, unique: true
    add_column :products, :warranty_type, :integer
    add_column :products, :purchase_date, :date
    add_column :products, :category_id, :integer

    add_index :products, :barcode
    add_index :products, [:name, :warranty_type]
  end
end
