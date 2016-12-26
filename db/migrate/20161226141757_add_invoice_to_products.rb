class AddInvoiceToProducts < ActiveRecord::Migration
  def change
    add_column :products, :invoice, :string
  end
end
