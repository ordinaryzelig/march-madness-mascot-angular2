namespace :mascots do

  task :compile do
    require 'csv'
    require 'json'

    csv_dir = __dir__ + '/db/*.csv'
    output = __dir__ + '/src/app/mascot-data.ts'

    grouped_by_year = Dir[csv_dir].each_with_object({}) do |file, hash|
      year = file.scan(/\d+(?=\.csv)/).first.to_i
      hash[year] = []
      CSV.foreach(file, :headers => true) do |row|
        hash[year] << row.to_hash
      end
    end

    json = JSON.pretty_generate(grouped_by_year)

    File.open(output, 'w+') do |file|
      file.write ' export const MASCOT_DATA = '
      file.write json
    end
  end

end
