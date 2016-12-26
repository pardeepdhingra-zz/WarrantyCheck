class CreateBrands < ActiveRecord::Migration
  def change
    create_table :brands do |t|
      t.string :name, :string, null: false
      t.timestamps null: false
    end
  end
end
