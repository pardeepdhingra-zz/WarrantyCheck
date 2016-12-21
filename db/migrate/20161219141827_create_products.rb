class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.integer :owner_id
      t.string :item_id, unique: true
      t.string :name
      t.text :description
      t.string :product_type
      t.string :brand
      t.date :date_of_purchase
      t.date :warranty_expire_date
      t.timestamps null: false
    end
    add_index :products, :item_id
    add_index :products, :name
    add_index :products, [:name, :product_type]
    add_index :products, [:name, :brand]
    add_index :products, [:brand, :product_type]
  end
end
