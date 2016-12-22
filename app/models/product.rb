class Product < ActiveRecord::Base
  acts_as_paranoid
  enum status: [:under_warranty, :warranty_expired]
  default_scope {order(warranty_expire_date: :asc)}

  validates :item_id, :name, presence: true
  validates :item_id, uniqueness: true
  belongs_to :owner, foreign_key: :owner_id

  before_save :check_warranty

  def check_warranty
    if self.warranty_expire_date.present? and self.warranty_expire_date < Date.today
      self.status = "warranty_expired"
    else
      self.status = "under_warranty"
    end
  end

  def self.update_warranty_status
    Product.where('status = ? and warranty_expire_date < ?', 0, Date.today)
           .update_all(status: :warranty_expired)
  end

  def self.search(term)
    wild_card_term = "%#{term}%"
    where("name ilike :search_term
      or description ilike :search_term
      or item_id ilike :search_term
      or brand ilike :search_term
      or product_type ilike :search_term",
      search_term: wild_card_term)
  end

  def self.search_by_item_id(item_id)
    where("item_id ilike ? ", item_id)
  end
end
