class AddProfileToImages < ActiveRecord::Migration
  def change
    add_column :images, :profile, :boolean, default: false
  end
end
