class JoinTableBrandsCategories < ActiveRecord::Migration
  def change
    create_join_table :brands, :categories do |t|
      t.index :brand_id
      t.index :category_id
    end
  end
end
